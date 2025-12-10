// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFiles` from `vitest.config.ts`
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Fail on console errors/warnings (equivalent to jest-fail-on-console)
failOnConsole({
  shouldFailOnWarn: true,
  shouldFailOnError: true,
});

// Mock react-markdown (equivalent to __mocks__/react-markdown.js)
vi.mock("react-markdown", () => {
  const React = require("react");
  return {
    default: ({ children }: { children: React.ReactNode }) => {
      return React.createElement("div", null, children);
    },
  };
});

// Setup for Next.js environment variables and matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
