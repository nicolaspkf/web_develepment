"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FireTextProps {
  children: ReactNode;
  className?: string;
}

export default function FireText({ children, className = "" }: FireTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!hovered || !canvasRef.current || !containerRef.current || !textRef.current) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const textEl = textRef.current;
    if (!ctx) return;

    const rect = containerRef.current.getBoundingClientRect();
    const padX = 8;
    const flameRise = 34;
    const W = Math.ceil(rect.width + padX * 2);
    const H = Math.ceil(rect.height + flameRise);
    canvas.width = W;
    canvas.height = H;

    // Fire simulation at full resolution
    const fw = W;
    const fh = H;
    const fire = new Float32Array(fw * fh);

    // Smooth gradient palette with more intermediate colors
    const paletteSize = 64;
    const palette: [number, number, number, number][] = [];
    for (let i = 0; i < paletteSize; i++) {
      const t = i / (paletteSize - 1);
      let r: number, g: number, b: number, a: number;
      if (t < 0.15) {
        // Transparent to dark red
        const s = t / 0.15;
        r = Math.round(s * 80);
        g = 0;
        b = 0;
        a = Math.round(s * 100);
      } else if (t < 0.4) {
        // Dark red to bright orange
        const s = (t - 0.15) / 0.25;
        r = Math.round(80 + s * 175);
        g = Math.round(s * 80);
        b = 0;
        a = Math.round(100 + s * 80);
      } else if (t < 0.7) {
        // Orange to yellow
        const s = (t - 0.4) / 0.3;
        r = 255;
        g = Math.round(80 + s * 140);
        b = Math.round(s * 30);
        a = Math.round(180 + s * 40);
      } else if (t < 0.9) {
        // Yellow to bright white-yellow
        const s = (t - 0.7) / 0.2;
        r = 255;
        g = Math.round(220 + s * 35);
        b = Math.round(30 + s * 180);
        a = Math.round(220 - s * 60);
      } else {
        // White-hot tip (thin, fading)
        const s = (t - 0.9) / 0.1;
        r = 255;
        g = 255;
        b = Math.round(210 + s * 45);
        a = Math.round(160 - s * 140);
      }
      palette.push([r, g, b, a]);
    }

    let frame = 0;

    const animate = () => {
      frame++;

      // Update fire simulation every 2nd frame
      if (frame % 2 === 0) {
        // Seed bottom row with random heat sources
        for (let x = 0; x < fw; x++) {
          const idx = (fh - 1) * fw + x;
          const r = Math.random();
          if (r > 0.62) {
            fire[idx] = 45 + Math.random() * 19;
          } else if (r > 0.40) {
            fire[idx] = 18 + Math.random() * 20;
          } else {
            fire[idx] = Math.max(0, fire[idx] * 0.3);
          }
        }

        // Propagate fire upward with smooth decay
        for (let y = 0; y < fh - 1; y++) {
          for (let x = 0; x < fw; x++) {
            // Sample from below with wider spread for smoother flames
            const left = Math.max(0, x - 1);
            const right = Math.min(fw - 1, x + 1);
            const below = y + 1;
            const below2 = Math.min(fh - 1, y + 2);

            // Weighted average of neighbors below for smooth propagation
            const v = (
              fire[below * fw + left] * 0.15 +
              fire[below * fw + x] * 0.45 +
              fire[below * fw + right] * 0.15 +
              fire[below2 * fw + x] * 0.25
            );

            // Random drift
            const drift = Math.floor(Math.random() * 3) - 1;
            const destX = Math.min(fw - 1, Math.max(0, x + drift));

            // Height-based decay — flames thin out as they rise
            const heightRatio = 1 - (y / fh);
            let decay = 0.6 + Math.random() * 0.8;
            if (heightRatio > 0.4) decay += 0.3;
            if (heightRatio > 0.65) decay += 0.5;
            if (heightRatio > 0.85) decay += 1.0;

            fire[y * fw + destX] = Math.max(0, v - decay);
          }
        }

        // Fade top rows
        for (let x = 0; x < fw; x++) {
          fire[x] *= 0.1;
          fire[fw + x] *= 0.3;
          fire[fw * 2 + x] *= 0.6;
        }
      }

      // Ember pulse for text color
      const pulse = Math.sin(frame * 0.025);
      const pulseNorm = (pulse + 1) / 2;
      const tr = Math.round(60 + pulseNorm * 195);
      const tg = Math.round(15 + pulseNorm * 120);
      const tb = Math.round(0 + pulseNorm * 10);
      const textColor = `rgb(${tr},${tg},${tb})`;

      const glowStrength = 0.3 + pulseNorm * 0.7;
      textEl.style.color = textColor;
      textEl.style.textShadow = [
        `1px 1px 0 rgba(40,10,0,0.95)`,
        `-1px -1px 0 rgba(40,10,0,0.95)`,
        `1px -1px 0 rgba(40,10,0,0.95)`,
        `-1px 1px 0 rgba(40,10,0,0.95)`,
        `0 0 ${3 + pulseNorm * 3}px rgba(255,200,60,${glowStrength})`,
        `0 0 ${8 + pulseNorm * 8}px rgba(255,120,20,${glowStrength * 0.7})`,
        `0 0 ${16 + pulseNorm * 16}px rgba(255,60,0,${glowStrength * 0.35})`,
      ].join(", ");

      // Render fire to canvas
      const imageData = ctx.createImageData(W, H);
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const val = fire[y * fw + x];
          if (val < 0.5) continue;

          // Map float value to palette index
          const pIdx = Math.min(paletteSize - 1, Math.floor(val * (paletteSize / 64)));
          const [r, g, b, a] = palette[pIdx];

          // Edge fade
          let fade = 1;
          if (x < 6) fade *= x / 6;
          if (x > W - 6) fade *= (W - x) / 6;
          if (y < 8) fade *= y / 8;

          const idx = (y * W + x) * 4;
          imageData.data[idx] = r;
          imageData.data[idx + 1] = g;
          imageData.data[idx + 2] = b;
          imageData.data[idx + 3] = Math.floor(a * fade);
        }
      }
      ctx.putImageData(imageData, 0, 0);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      if (textEl) {
        textEl.style.color = "";
        textEl.style.textShadow = "none";
      }
    };
  }, [hovered]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none"
        style={{
          left: "-8px",
          bottom: "0px",
          width: "calc(100% + 16px)",
          height: "calc(100% + 34px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          mixBlendMode: "screen",
          filter: "blur(0.8px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <span ref={textRef} className="relative z-10" style={{ transition: "color 0.3s ease" }}>
        {children}
      </span>
    </span>
  );
}
