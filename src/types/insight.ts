import { ReadTimeResults } from "reading-time";

// src/types/insight.ts
export type ContentType = "blog" | "insight" | "projects";

export interface BaseFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  lastUpdated: string;
  banner?: string;
  category: string; // Tambahkan ini
  tags: string[];
}

export interface BlogFrontmatter extends BaseFrontmatter {
  slug: string; // Selalu sertakan slug
  title: string;
  description: string;
  publishedAt: string;
  lastUpdated: string;
  category: string; // Tambahkan ini
  tags: string[];
  author: string;
  readingTime: ReadTimeResults;
  wordCount: number;
  banner?: string;
}

export type PickFrontmatter<T extends ContentType> = T extends "insight"
  ? BlogFrontmatter
  : BaseFrontmatter;

export interface PostContent<T extends ContentType> {
  slug: string;
  frontmatter: PickFrontmatter<T> & {
    readingTime: ReadTimeResults;
    wordCount: number;
  };
  code: string;
}