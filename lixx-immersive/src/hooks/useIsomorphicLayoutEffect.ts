import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe LayoutEffect.
 * - Uses useLayoutEffect in the browser for GSAP measurements.
 * - Falls back to useEffect on the server to avoid warnings.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

