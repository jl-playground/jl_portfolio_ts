#!/usr/bin/env node

/**
 * Fetches the Ghost RSS feed and emits src/assets/blog-posts.json.
 *
 * BlogPostSummary shape (matches src/entities/blog/model/types.ts):
 *   title: string
 *   url: string
 *   slug: string
 *   excerpt: string
 *   date: string (YYYY-MM-DD)
 *   tags: string[]
 *   featureImage: string | null
 *   readTimeMinutes: number | null
 */

import { XMLParser } from "fast-xml-parser";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = dirname(__dirname);

const RSS_URL = "https://blog.stacktrace.space/rss/";
const OUTPUT_PATH = join(PROJECT_ROOT, "src", "assets", "blog-posts.json");

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function truncate(str, max = 280) {
  if (str.length <= max) return str;
  return str.slice(0, max).replace(/\s\S*$/, "") + "...";
}

function toIsoDate(dateStr) {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
}

function estimateReadTime(html) {
  if (!html) return null;
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function extractSlug(url) {
  try {
    const u = new URL(url);
    const segments = u.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1];
  } catch {
    return url;
  }
}

async function run() {
  try {
    const res = await fetch(RSS_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      textNodeName: "#text",
      attributeNamePrefix: "@_",
    });
    const json = parser.parse(xml);

    const items = json?.rss?.channel?.item;
    const itemArray = Array.isArray(items) ? items : items ? [items] : [];

    const posts = itemArray
      .map((item) => {
        const title = item.title || "";
        const url = item.link || "";
        const slug = extractSlug(url);
        const description = item.description || "";
        const pubDate = item.pubDate || "";
        const contentEncoded = item?.["content:encoded"] || "";

        // Categories
        const cats = item.category;
        const tags = Array.isArray(cats)
          ? cats.filter((c) => typeof c === "string").map((c) => c.trim())
          : cats
            ? [cats.trim()]
            : [];

        // Feature image from media:content
        const mediaContent = item?.["media:content"];
        const featureImage =
          mediaContent?.["@_url"] && typeof mediaContent["@_url"] === "string"
            ? mediaContent["@_url"]
            : null;

        return {
          title,
          url,
          slug,
          excerpt: truncate(stripHtml(description)),
          date: toIsoDate(pubDate),
          tags,
          featureImage,
          readTimeMinutes: estimateReadTime(contentEncoded),
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 10);

    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2), "utf-8");
    console.log(`[blog:fetch] Wrote ${posts.length} posts to ${OUTPUT_PATH}`);
  } catch (err) {
    console.warn(`[blog:fetch] WARNING: Failed to fetch blog posts: ${err.message}`);
    console.warn("[blog:fetch] Writing empty array — blog section will show fallback CTA.");
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, "[]", "utf-8");
  }
}

run();
