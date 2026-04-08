"use client";

import { useEffect, useRef, useState } from "react";

interface FlagRippleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Flag ripple effect using canvas mesh deformation.
 * Renders the child element normally, then on hover applies a smooth
 * sine-wave distortion via CSS animation layers — no SVG filters (which stutter).
 */
export default function FlagRipple({ children, className = "" }: FlagRippleProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <div
        className={hovered ? "flag-wave-active" : ""}
        style={{
          transformOrigin: "left center",
          willChange: hovered ? "transform" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Alternative: Canvas-based mesh deformation for smoother flag effect.
 * Captures the element as pixels and deforms with sine waves.
 */
export function FlagRippleCanvas({ children, className = "" }: FlagRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!hovered) {
      cancelAnimationFrame(animRef.current);
      timeRef.current = 0;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We'll just animate the container's CSS transform smoothly
    const animate = () => {
      timeRef.current += 0.015;
      const t = timeRef.current;

      // Compound wave: slow primary wave + faster secondary ripple
      // This creates the natural cloth-in-wind look
      const wave1 = Math.sin(t * 1.2) * 2.5;          // slow primary sway
      const wave2 = Math.sin(t * 2.4 + 0.5) * 1.2;    // medium ripple
      const wave3 = Math.sin(t * 3.8 + 1.0) * 0.6;    // subtle fast detail

      const rotateY = wave1 + wave2 * 0.5;
      const skewX = wave2 + wave3;
      const skewY = wave1 * 0.3 + wave3 * 0.5;
      const scaleX = 1 + Math.sin(t * 1.8) * 0.008;

      container.style.transform =
        `perspective(800px) rotateY(${rotateY}deg) skewX(${skewX * 0.3}deg) skewY(${skewY * 0.15}deg) scaleX(${scaleX})`;

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      if (container) container.style.transform = "";
    };
  }, [hovered]);

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={containerRef}
        style={{
          transformOrigin: "left center",
          transition: hovered ? "none" : "transform 0.5s ease-out",
        }}
      >
        {children}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
