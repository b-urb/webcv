#!/usr/bin/env node

/**
 * Download every Directus image the site renders, at the widths next/image
 * will ask for, into public/_assets.
 *
 * The static export has to survive Directus being unreachable — a visitor
 * loading burbn.de while the homelab is down must still see the page and its
 * images. Anything still pointing at cms.burbn.de at view time defeats that,
 * so the build pulls the assets in and lib/imageLoader.ts serves the copies.
 *
 * Usage:
 *   DIRECTUS_TOKEN=... node scripts/download-directus-assets.mjs
 *
 * Env:
 *   DIRECTUS_TOKEN (required)
 *   DIRECTUS_API_URL (default https://cms.burbn.de)
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const apiUrl = process.env.DIRECTUS_API_URL ?? "https://cms.burbn.de";
const token = process.env.DIRECTUS_TOKEN;

if (!token) {
  console.error("Missing Directus token. Set DIRECTUS_TOKEN.");
  process.exit(1);
}

// Keep in step with DEVICE_SIZES in lib/assets.ts — the loader only asks for
// these widths, so downloading others wastes build time and bandwidth.
const DEVICE_SIZES = [640, 828, 1200, 1920, 2048];

// Rendered by components/ProfileImage.tsx, which hardcodes it rather than
// reading it from a collection.
const PROFILE_UUID = "218814ac-b04e-4156-9be9-3770ff825a70";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(repoRoot, "public", "_assets");

async function api(pathname, params = {}) {
  const url = new URL(`${apiUrl}${pathname}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    throw new Error(`${pathname} -> ${res.status} ${res.statusText}`);
  }
  return (await res.json()).data;
}

/** Every asset UUID the site can render: blog thumbnails, employer logos, the profile picture. */
async function collectUuids() {
  const uuids = new Set([PROFILE_UUID]);

  const blogposts = await api("/items/blogposts", {
    fields: "thumbnail",
    limit: "-1",
  });
  for (const post of blogposts ?? []) {
    if (post.thumbnail) uuids.add(post.thumbnail);
  }

  const work = await api("/items/work_experience", {
    fields: "logo",
    limit: "-1",
  });
  for (const entry of work ?? []) {
    if (entry.logo) uuids.add(entry.logo);
  }

  return [...uuids];
}

async function download(uuid, width) {
  const url = new URL(`${apiUrl}/assets/${uuid}`);
  url.searchParams.set("width", String(width));
  url.searchParams.set("quality", "80");
  url.searchParams.set("format", "webp");

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    // A missing asset should fail the build rather than ship a broken page:
    // the whole point is that nothing is fetched at view time, so a gap here
    // is permanent rather than self-healing.
    throw new Error(`asset ${uuid} @${width} -> ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, `${uuid}-${width}.webp`), buf);
  return buf.length;
}

await mkdir(outDir, { recursive: true });

const uuids = await collectUuids();
console.log(`[assets] ${uuids.length} asset(s) × ${DEVICE_SIZES.length} widths`);

let bytes = 0;
for (const uuid of uuids) {
  for (const width of DEVICE_SIZES) {
    bytes += await download(uuid, width);
  }
}

console.log(`[assets] wrote ${(bytes / 1024 / 1024).toFixed(1)} MB to public/_assets`);
