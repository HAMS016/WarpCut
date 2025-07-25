import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer, serial, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Media Files table
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'video', 'audio', 'image'
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: real("duration"), // For video/audio files in seconds
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videoProjects = pgTable("video_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  originalFileName: text("original_file_name").notNull(),
  duration: integer("duration").notNull(), // in seconds
  transcript: jsonb("transcript").$type<TranscriptSegment[]>().default([]),
  cuts: jsonb("cuts").$type<CutSegment[]>().default([]),
  settings: jsonb("settings").$type<VideoSettings>().default({
    showCaptions: false,
    cropMode: "16:9",
    captionStyle: "youtube",
    fontSize: 24,
    captionPosition: "bottom"
  }),
  status: text("status").$type<"uploading" | "processing" | "ready" | "exporting">().notNull().default("uploading"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence?: number;
  isDeleted?: boolean;
  isFiller?: boolean;
}

export interface CutSegment {
  start: number;
  end: number;
  type: "silence" | "filler" | "manual";
}

export interface VideoSettings {
  showCaptions: boolean;
  cropMode: "16:9" | "9:16" | "1:1";
  captionStyle: "youtube" | "tiktok" | "instagram" | "custom";
  fontSize: number;
  captionPosition: "top" | "middle" | "bottom";
}

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  videoProjects: many(videoProjects),
  mediaFiles: many(mediaFiles),
}));

export const videoProjectsRelations = relations(videoProjects, ({ one }) => ({
  user: one(users, {
    fields: [videoProjects.userId],
    references: [users.id],
  }),
}));

export const mediaFilesRelations = relations(mediaFiles, ({ one }) => ({
  user: one(users, {
    fields: [mediaFiles.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
});

export const insertVideoProjectSchema = createInsertSchema(videoProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type MediaFile = typeof mediaFiles.$inferSelect;

export type InsertVideoProject = z.infer<typeof insertVideoProjectSchema>;
export type VideoProject = typeof videoProjects.$inferSelect;
