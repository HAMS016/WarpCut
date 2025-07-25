import { 
  type VideoProject, 
  type InsertVideoProject,
  type User,
  type InsertUser,
  type MediaFile,
  type InsertMediaFile,
  users,
  videoProjects,
  mediaFiles
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Video Project methods
  getVideoProject(id: string): Promise<VideoProject | undefined>;
  createVideoProject(project: InsertVideoProject): Promise<VideoProject>;
  updateVideoProject(id: string, project: Partial<VideoProject>): Promise<VideoProject>;
  deleteVideoProject(id: string): Promise<void>;
  getAllVideoProjects(): Promise<VideoProject[]>;
  getUserVideoProjects(userId: number): Promise<VideoProject[]>;
  
  // Media File methods
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<void>;
  getUserMediaFiles(userId: number): Promise<MediaFile[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Video Project methods
  async getVideoProject(id: string): Promise<VideoProject | undefined> {
    const [project] = await db.select().from(videoProjects).where(eq(videoProjects.id, id));
    return project || undefined;
  }

  async createVideoProject(insertProject: InsertVideoProject): Promise<VideoProject> {
    const [project] = await db
      .insert(videoProjects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateVideoProject(id: string, updates: Partial<VideoProject>): Promise<VideoProject> {
    const [project] = await db
      .update(videoProjects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(videoProjects.id, id))
      .returning();
    
    if (!project) {
      throw new Error("Video project not found");
    }
    return project;
  }

  async deleteVideoProject(id: string): Promise<void> {
    await db.delete(videoProjects).where(eq(videoProjects.id, id));
  }

  async getAllVideoProjects(): Promise<VideoProject[]> {
    return await db.select().from(videoProjects).orderBy(desc(videoProjects.createdAt));
  }

  async getUserVideoProjects(userId: number): Promise<VideoProject[]> {
    return await db
      .select()
      .from(videoProjects)
      .where(eq(videoProjects.userId, userId))
      .orderBy(desc(videoProjects.createdAt));
  }

  // Media File methods
  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    const [file] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id));
    return file || undefined;
  }

  async createMediaFile(insertMediaFile: InsertMediaFile): Promise<MediaFile> {
    const [file] = await db
      .insert(mediaFiles)
      .values(insertMediaFile)
      .returning();
    return file;
  }

  async deleteMediaFile(id: number): Promise<void> {
    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));
  }

  async getUserMediaFiles(userId: number): Promise<MediaFile[]> {
    return await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.userId, userId))
      .orderBy(desc(mediaFiles.createdAt));
  }
}

export const storage = new DatabaseStorage();
