/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://burbn.de",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  // The export has already been written to ./out by the time postbuild runs,
  // so writing into ./public (the default) would land after the copy and
  // never reach the deployed site.
  outDir: "out",
  // ...other options
};
