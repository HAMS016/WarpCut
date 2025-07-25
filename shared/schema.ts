import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const videoProjects = pgTable("video_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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

export const insertVideoProjectSchema = createInsertSchema(videoProjects).omit({
  id: true,
  createdAt: true,
});

export type InsertVideoProject = z.infer<typeof insertVideoProjectSchema>;
export type VideoProject = typeof videoProjects.$inferSelect;
