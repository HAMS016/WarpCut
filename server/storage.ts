import { type VideoProject, type InsertVideoProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getVideoProject(id: string): Promise<VideoProject | undefined>;
  createVideoProject(project: InsertVideoProject): Promise<VideoProject>;
  updateVideoProject(id: string, project: Partial<VideoProject>): Promise<VideoProject>;
  deleteVideoProject(id: string): Promise<void>;
  getAllVideoProjects(): Promise<VideoProject[]>;
}

export class MemStorage implements IStorage {
  private videoProjects: Map<string, VideoProject>;

  constructor() {
    this.videoProjects = new Map();
  }

  async getVideoProject(id: string): Promise<VideoProject | undefined> {
    return this.videoProjects.get(id);
  }

  async createVideoProject(insertProject: InsertVideoProject): Promise<VideoProject> {
    const id = randomUUID();
    const project: VideoProject = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.videoProjects.set(id, project);
    return project;
  }

  async updateVideoProject(id: string, updates: Partial<VideoProject>): Promise<VideoProject> {
    const existing = this.videoProjects.get(id);
    if (!existing) {
      throw new Error("Video project not found");
    }
    const updated = { ...existing, ...updates };
    this.videoProjects.set(id, updated);
    return updated;
  }

  async deleteVideoProject(id: string): Promise<void> {
    this.videoProjects.delete(id);
  }

  async getAllVideoProjects(): Promise<VideoProject[]> {
    return Array.from(this.videoProjects.values());
  }
}

export const storage = new MemStorage();
