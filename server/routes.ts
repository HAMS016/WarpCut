import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoProjectSchema, insertUserSchema, insertMediaFileSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "./db";

// Extend session type to include user
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const PgSession = ConnectPgSimple(session);
  app.use(session({
    store: new PgSession({
      pool: pool,
      tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET || 'warpcut-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, email } = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword
      });

      // Start session
      req.session.userId = user.id;
      req.session.username = user.username;

      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Start session
      req.session.userId = user.id;
      req.session.username = user.username;

      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Media Files routes
  app.get("/api/media-files", requireAuth, async (req, res) => {
    try {
      const files = await storage.getUserMediaFiles(req.session.userId!);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.post("/api/media-files", requireAuth, async (req, res) => {
    try {
      const validatedData = insertMediaFileSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      const file = await storage.createMediaFile(validatedData);
      res.status(201).json(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create media file" });
    }
  });

  app.delete("/api/media-files/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const file = await storage.getMediaFile(id);
      
      if (!file || file.userId !== req.session.userId) {
        return res.status(404).json({ message: "Media file not found" });
      }

      await storage.deleteMediaFile(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media file" });
    }
  });
  // Get user's video projects
  app.get("/api/video-projects", requireAuth, async (req, res) => {
    try {
      const projects = await storage.getUserVideoProjects(req.session.userId!);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video projects" });
    }
  });

  // Get a specific video project (user must own it)
  app.get("/api/video-projects/:id", requireAuth, async (req, res) => {
    try {
      const project = await storage.getVideoProject(req.params.id);
      if (!project || project.userId !== req.session.userId) {
        return res.status(404).json({ message: "Video project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video project" });
    }
  });

  // Create a new video project
  app.post("/api/video-projects", requireAuth, async (req, res) => {
    try {
      const validatedData = insertVideoProjectSchema.parse({
        ...req.body,
        userId: req.session.userId
      });
      const project = await storage.createVideoProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create video project" });
    }
  });

  // Update a video project (user must own it)
  app.patch("/api/video-projects/:id", requireAuth, async (req, res) => {
    try {
      const existing = await storage.getVideoProject(req.params.id);
      if (!existing || existing.userId !== req.session.userId) {
        return res.status(404).json({ message: "Video project not found" });
      }
      
      const project = await storage.updateVideoProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      if (error instanceof Error && error.message === "Video project not found") {
        return res.status(404).json({ message: "Video project not found" });
      }
      res.status(500).json({ message: "Failed to update video project" });
    }
  });

  // Delete a video project (user must own it)
  app.delete("/api/video-projects/:id", requireAuth, async (req, res) => {
    try {
      const existing = await storage.getVideoProject(req.params.id);
      if (!existing || existing.userId !== req.session.userId) {
        return res.status(404).json({ message: "Video project not found" });
      }
      
      await storage.deleteVideoProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
