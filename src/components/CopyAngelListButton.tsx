"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export function CopyAngelListButton() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopyAngelListLink() {
    try {
      await navigator.clipboard.writeText("https://angellist.com/i/Biwgd");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }

    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  }

  return (
    <Button type="button" variant="secondary" onClick={handleCopyAngelListLink}>
      {copyStatus === "copied"
        ? "Copied AngelList link"
        : copyStatus === "failed"
          ? "Copy failed"
          : "Copy angellist link"}
    </Button>
  );
}
