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
    // Mobile browsers often block downloads that start after an async boundary.
    // Pre-open a window/tab during the user gesture and later navigate it.
    const shouldPreopen = isLikelyMobileDevice();
    const preopenedWindow = shouldPreopen
      ? window.open("about:blank", "_blank", "noopener,noreferrer")
      : null;

    if (preopenedWindow) {
      try {
        preopenedWindow.document.title = "Saravafy";
        preopenedWindow.document.body.style.fontFamily =
          "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
        preopenedWindow.document.body.style.margin = "16px";
        preopenedWindow.document.body.innerHTML =
          "<p style='margin:0;font-weight:700'>Preparando download…</p><p style='margin:8px 0 0;opacity:.75'>Se nada acontecer, volte para a aba anterior.</p>";
      } catch {
        // ignore (some browsers restrict access)
      }
    }

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
      if (preopenedWindow && !preopenedWindow.closed) {
        try {
          preopenedWindow.close();
        } catch {
          // ignore
        }
      }
      console.warn(
        "[Saravafy] Install URL unavailable (fresh fetch returned null and no session fallback).",
      );
      return;
    }

    // Prefer navigating the pre-opened window on mobile.
    if (preopenedWindow && !preopenedWindow.closed) {
      try {
        preopenedWindow.location.href = urlToUse;
        return;
      } catch {
        try {
          preopenedWindow.close();
        } catch {
          // ignore
        }
      }
    }

    triggerIframeDownload(urlToUse);
  }, [installUrl, refetch]);

  return { handleInstallClick, isLoading, installUrl };
}
