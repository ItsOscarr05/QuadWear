"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      return;
    }
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setProgress(12);
    const t1 = window.setTimeout(() => setProgress(78), 70);
    const t2 = window.setTimeout(() => setProgress(100), 260);
    const t3 = window.setTimeout(() => setProgress(0), 520);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-full bg-black/5"
      aria-hidden
    >
      <div
        className="h-full bg-primary transition-[width] duration-200 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
