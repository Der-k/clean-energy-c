"use client";

import { useTracking } from "@/hooks/useTracking";

/**
 * Drop this inside <RoleProvider> in app/layout.tsx.
 * It activates global page view + interaction tracking
 * for every page in the app with zero per-page setup.
 *
 * Usage:
 *   <RoleProvider>
 *     <TrackingProvider />
 *     {children}
 *   </RoleProvider>
 */
export function TrackingProvider() {
  useTracking();
  return null; // renders nothing — purely a side-effect component
}