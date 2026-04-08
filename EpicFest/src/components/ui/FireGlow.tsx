"use client";

import { cn } from "@/lib/utils";

interface FireGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

export default function FireGlow({ children, className, intensity = "medium" }: FireGlowProps) {
  const glowStyles = {
    subtle: "shadow-[0_0_30px_rgba(212,168,75,0.1),0_0_60px_rgba(212,168,75,0.05)]",
    medium: "shadow-[0_0_30px_rgba(212,168,75,0.15),0_0_60px_rgba(212,168,75,0.08),0_0_90px_rgba(180,120,30,0.05)]",
    strong: "shadow-[0_0_40px_rgba(212,168,75,0.2),0_0_80px_rgba(212,168,75,0.1),0_0_120px_rgba(180,120,30,0.08)]",
  };

  return (
    <div className={cn("relative", glowStyles[intensity], className)}>
      {children}
    </div>
  );
}
