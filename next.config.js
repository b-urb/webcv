const { DEVICE_SIZES } = require("./lib/assets.cjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is built to plain files and served from
  // Cloudflare with no runtime dependency on the homelab, so burbn.de stays
  // up when Directus is down. It used to server-render against cms.burbn.de
  // on every request, which meant a homelab outage took the site with it.
  output: "export",
  reactStrictMode: true,
  images: {
    // next/image's optimiser is a server feature and cannot run in an
    // export, so every <Image> goes through our own loader instead.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes: [...DEVICE_SIZES],
    imageSizes: [],
  },
};

module.exports = nextConfig;
