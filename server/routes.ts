import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoProjectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all video projects
  app.get("/api/video-projects", async (req, res) => {
    try {
      const projects = await storage.getAllVideoProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video projects" });
    }
  });

  // Get a specific video project
  app.get("/api/video-projects/:id", async (req, res) => {
    try {
      const project = await storage.getVideoProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Video project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video project" });
    }
  });

  // Create a new video project
  app.post("/api/video-projects", async (req, res) => {
    try {
      const validatedData = insertVideoProjectSchema.parse(req.body);
      const project = await storage.createVideoProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create video project" });
    }
  });

  // Update a video project
  app.patch("/api/video-projects/:id", async (req, res) => {
    try {
      const project = await storage.updateVideoProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      if (error instanceof Error && error.message === "Video project not found") {
        return res.status(404).json({ message: "Video project not found" });
      }
      res.status(500).json({ message: "Failed to update video project" });
    }
  });

  // Delete a video project
  app.delete("/api/video-projects/:id", async (req, res) => {
    try {
      await storage.deleteVideoProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
