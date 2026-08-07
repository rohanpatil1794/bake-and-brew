import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// jsdom has no IntersectionObserver; framer-motion's whileInView needs it.
// Stub it so scroll-reveal components render in tests.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

const globalWithIO = globalThis as typeof globalThis & {
  IntersectionObserver?: typeof IntersectionObserver;
};
if (!globalWithIO.IntersectionObserver) {
  globalWithIO.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

// jsdom has no matchMedia; framer-motion's useReducedMotion reads it.
// Report reduced-motion so animated components settle deterministically in tests.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList;
}
