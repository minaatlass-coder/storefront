"use client";

import { useEffect, useRef } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

interface Props {
  event: TrackEvent;
  props?: Record<string, unknown>;
}

/**
 * Tiny client component that fires a single dataLayer event when it mounts.
 * Used inside server-rendered pages (PDP, etc.) without making the whole page client.
 */
export function TrackOnMount({ event, props }: Props) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, props);
  }, [event, props]);
  return null;
}
