import type { ImageLoaderProps } from "next/image";

import { directusAssetUrl, localAssetPath, USE_LOCAL_ASSETS } from "./assets";

// next.config.js wires this as the global image loader, so every <Image>
// resolves the same way and no component carries its own copy.
export default function directusImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (USE_LOCAL_ASSETS) {
    return localAssetPath(src, width);
  }
  return directusAssetUrl(src, width, quality ?? 75);
}
