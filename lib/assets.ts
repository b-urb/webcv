// Directus image handling for the static export.
//
// The site is built to plain files and served from Cloudflare with no
// runtime dependency on the homelab, so images cannot be fetched from
// cms.burbn.de when a visitor loads the page — that is the whole point of
// the static build. scripts/download-directus-assets.mjs pulls every
// referenced asset at build time into public/_assets, and the loader below
// points at those copies whenever USE_LOCAL_ASSETS is set.
//
// Without the flag (dev, storybook) it falls back to Directus directly, so
// local work needs no download step.

// Single source of truth lives in assets.cjs, because next.config.js is
// CommonJS and cannot import this module. Importing it back here keeps the
// two from drifting.
import { DEVICE_SIZES as SIZES } from "./assets.cjs";

export const DEVICE_SIZES: readonly number[] = SIZES;

export const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "https://cms.burbn.de";

export const USE_LOCAL_ASSETS =
  process.env.NEXT_PUBLIC_USE_LOCAL_ASSETS === "true";

/** Nearest width we actually downloaded, so the loader never asks for a file that is not there. */
export function nearestDeviceSize(width: number): number {
  return (
    DEVICE_SIZES.find((size) => size >= width) ??
    DEVICE_SIZES[DEVICE_SIZES.length - 1]
  );
}

export function localAssetPath(uuid: string, width: number): string {
  return `/_assets/${uuid}-${nearestDeviceSize(width)}.webp`;
}

export function directusAssetUrl(
  uuid: string,
  width: number,
  quality = 75
): string {
  return `${DIRECTUS_URL}/assets/${uuid}?width=${width}&quality=${quality}`;
}
