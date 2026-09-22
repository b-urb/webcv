// Shared with next.config.js, which is CommonJS and cannot import the
// TypeScript module. lib/assets.ts re-exports these so there is one list.
const DEVICE_SIZES = [640, 828, 1200, 1920, 2048];
module.exports = { DEVICE_SIZES };
