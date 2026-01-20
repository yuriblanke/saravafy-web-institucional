"use client";

import { useCallback } from "react";

import {
  triggerIframeDownload,
  useFreshInstallUrl,
} from "@/lib/useFreshInstallUrl";

function isLikelyMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    ua,
  );
}

export function useInstallDownloadAction() {
  const { installUrl, isLoading, refetch } = useFreshInstallUrl();

  const handleInstallClick = useCallback(async () => {
    const isMobile = isLikelyMobileDevice();

    const fallbackFromSession = installUrl;

    let fresh: string | null = null;
    try {
      fresh = await refetch();
    } catch (err) {
      console.error(err);
      fresh = null;
    }

    const urlToUse = fresh ?? fallbackFromSession;

    if (!urlToUse) {
      console.warn(
        "[Saravafy] Install URL unavailable (fresh fetch returned null and no session fallback).",
      );
      return;
    }

    // Mobile browsers are more consistent when we navigate the current tab.
    // This avoids popups/blank tabs.
    if (isMobile) {
      window.location.assign(urlToUse);
      return;
    }

    triggerIframeDownload(urlToUse);
  }, [installUrl, refetch]);

  return { handleInstallClick, isLoading, installUrl };
}
