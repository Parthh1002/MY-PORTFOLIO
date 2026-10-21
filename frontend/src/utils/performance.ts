/**
 * Utility functions for device capability detection and performance tuning.
 * Follows clean code principles and enables buttery-smooth rendering on low-end devices.
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isTouch: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Detects device hardware limitations (cores, memory, touch, viewport)
 * to intelligently scale animation complexity and visual effects.
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTouch: false,
      isLowEnd: false,
      prefersReducedMotion: false,
    };
  }

  const isTouch =
    window.matchMedia("(pointer: coarse)").matches ||
    (typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 0);

  const isMobile = window.innerWidth < 768 || (isTouch && window.innerWidth < 1024);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Check hardware concurrency (CPU cores)
  const cpuCores =
    typeof navigator.hardwareConcurrency === "number"
      ? navigator.hardwareConcurrency
      : 8;

  // Check device memory in GB (supported in Chromium browsers)
  const memoryGB = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;

  const isLowEnd = isMobile || cpuCores <= 4 || memoryGB <= 4 || prefersReducedMotion;

  return {
    isMobile,
    isTouch,
    isLowEnd,
    prefersReducedMotion,
  };
}

/**
 * Shorthand helper to verify if the client should receive lightweight animations.
 */
export function isLowEndDevice(): boolean {
  return getDeviceCapabilities().isLowEnd;
}
