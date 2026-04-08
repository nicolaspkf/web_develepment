"use client";

import { useEffect, useRef } from "react";

interface EmberOverlayProps {
  density?: number;
  color?: string;
  className?: string;
}

export default function EmberOverlay({
  density = 15,
  color = "212, 168, 75",
  className = "",
}: EmberOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      flicker: number;
      flickerSpeed: number;
    }
    const embers: Ember[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createEmber = (): Ember => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 20,
      size: Math.random() * 4 + 1.5,
      speedY: -(Math.random() * 1.0 + 0.2),
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.8 + 0.2,
      flicker: 0,
      flickerSpeed: Math.random() * 0.04 + 0.015,
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (embers.length < density && Math.random() > 0.7) {
        embers.push(createEmber());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.speedX + Math.sin(e.flicker) * 0.3;
        e.y += e.speedY;
        e.flicker += e.flickerSpeed;

        const alpha = e.opacity * (0.7 + 0.3 * Math.sin(e.flicker));

        if (e.y < -20) {
          embers.splice(i, 1);
          continue;
        }

        // Glow — larger radius for more visible embers
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 5);
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(${color}, ${alpha * 0.5})`);
        gradient.addColorStop(0.6, `rgba(${color}, ${alpha * 0.15})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
