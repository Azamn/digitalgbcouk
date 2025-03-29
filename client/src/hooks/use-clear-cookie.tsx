"use client";

import { useEffect } from "react";

const useClearSessionOnNewTab = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const clearSession = async () => {
      try {
        await fetch("/api/cookies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Session cleared via API due to new tab opening!");
      } catch (error) {
        console.error("Error clearing session:", error);
      }
    };

    if (!sessionStorage.getItem("tabExists")) {
      sessionStorage.setItem("tabExists", "true");

      const previousTimestamp = localStorage.getItem("lastTabOpened");
      const currentTimestamp = Date.now().toString();

      if (previousTimestamp && previousTimestamp !== currentTimestamp) {
        clearSession();
      }

      localStorage.setItem("lastTabOpened", currentTimestamp);
    }
  }, []);

  return null;
};

export default useClearSessionOnNewTab;
