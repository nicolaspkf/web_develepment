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
    const padX = 6;
    const flameRise = 18;
    const W = Math.ceil(rect.width + padX * 2);
    const H = Math.ceil(rect.height + flameRise);
    canvas.width = W;
    canvas.height = H;

    const fw = Math.ceil(W / 2);
    const fh = Math.ceil(H / 2);
    const fire = new Uint8Array(fw * fh);

    const palette: [number, number, number, number][] = [
      [0,0,0,0],[30,0,0,35],[55,2,0,55],[75,5,0,72],[95,8,0,88],
      [115,12,0,102],[132,18,0,115],[148,24,0,126],[162,32,0,136],
      [176,42,0,144],[188,54,0,152],[198,66,0,158],[208,80,0,164],
      [216,94,0,168],[224,108,0,172],[230,120,0,175],[235,132,2,178],
      [238,144,6,180],[241,156,12,181],[243,168,20,182],[244,178,30,182],
      [245,188,42,181],[246,196,54,179],[247,204,68,176],[248,210,82,172],
      [249,216,98,167],[250,222,114,160],[251,226,132,152],[252,230,150,142],
      [252,234,168,130],[253,238,186,116],[253,240,204,100],[254,242,218,84],
      [254,244,230,68],[255,246,240,52],[255,248,246,38],[255,250,252,24],
    ];

    let frame = 0;

    const animate = () => {
      frame++;

      // Update every 3rd frame → slower, more realistic flame movement
      if (frame % 3 === 0) {
        for (let x = 0; x < fw; x++) {
          const idx = (fh - 1) * fw + x;
          const r = Math.random();
          if (r > 0.68) {
            fire[idx] = 28 + Math.floor(Math.random() * 9);
          } else if (r > 0.50) {
            fire[idx] = 12 + Math.floor(Math.random() * 12);
          } else {
            fire[idx] = 0;
          }
        }

        for (let y = 0; y < fh - 1; y++) {
          for (let x = 0; x < fw; x++) {
            const srcVal = fire[(y + 1) * fw + x];

            if (srcVal === 0) {
              fire[y * fw + x] = Math.max(0, fire[y * fw + x] - 2);
              continue;
            }

            const drift = Math.floor(Math.random() * 3) - 1;
            const destX = Math.min(fw - 1, Math.max(0, x + drift));

            const decayRand = Math.random();
            let decay: number;
            if (decayRand > 0.75) decay = 0;
            else if (decayRand > 0.35) decay = 1;
            else if (decayRand > 0.10) decay = 2;
            else decay = 3;

            // Gradual height-based decay — flames reach higher but thin out
            const heightRatio = 1 - (y / fh);
            if (heightRatio > 0.45) decay += 1;
            if (heightRatio > 0.70) decay += 1;
            if (heightRatio > 0.88) decay += 2;

            fire[y * fw + destX] = Math.max(0, srcVal - decay);
          }
        }

        // Kill top 2 rows
        for (let x = 0; x < fw; x++) {
          fire[x] = 0;
          fire[fw + x] = 0;
        }
      }

      // Ember pulse for text color: slow sine oscillation
      const pulse = Math.sin(frame * 0.025); // slow pulse
      const pulseNorm = (pulse + 1) / 2; // 0 to 1
      // Interpolate between dark ember (near-black/dark red) and bright orange
      const tr = Math.round(60 + pulseNorm * 195);  // 60 → 255
      const tg = Math.round(15 + pulseNorm * 120);  // 15 → 135
      const tb = Math.round(0 + pulseNorm * 10);    // 0 → 10
      const textColor = `rgb(${tr},${tg},${tb})`;

      // Glow intensity follows pulse
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

      // Render fire
      const imageData = ctx.createImageData(W, H);
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const fx = Math.min(fw - 1, Math.floor(x / 2));
          const fy = Math.min(fh - 1, Math.floor(y / 2));
          const val = fire[fy * fw + fx];
          if (val === 0) continue;

          const [r, g, b, a] = palette[Math.min(36, val)];

          let fade = 1;
          if (x < 5) fade *= x / 5;
          if (x > W - 5) fade *= (W - x) / 5;
          if (y < 6) fade *= y / 6;

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
      // Reset text style on unhover
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
          left: "-6px",
          bottom: "0px",
          width: "calc(100% + 12px)",
          height: "calc(100% + 18px)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          mixBlendMode: "screen",
          zIndex: 0,
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      />
      <span ref={textRef} className="relative z-10" style={{ transition: "color 0.3s ease" }}>
        {children}
      </span>
    </span>
  );
}
