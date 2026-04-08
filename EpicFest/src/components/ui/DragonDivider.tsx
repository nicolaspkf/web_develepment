import { cn } from "@/lib/utils";

interface DragonDividerProps {
  className?: string;
  variant?: "left" | "right" | "both";
}

export default function DragonDivider({ className, variant = "both" }: DragonDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-2", className)}>
      {(variant === "left" || variant === "both") && (
        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="text-gold/40 scale-x-[-1]">
          <path d="M2 12C10 12 15 4 25 4C32 4 35 8 40 12C45 16 48 20 55 20C65 20 70 12 78 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="78" cy="12" r="2" fill="currentColor" />
          <path d="M20 4L25 1L23 6" fill="currentColor" opacity="0.6" />
        </svg>
      )}

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rotate-45 bg-gold/60" />
        {/* Dragon head center */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-gold">
          <path d="M16 4L20 8L24 6L22 12L26 14L22 16L24 22L20 20L16 28L12 20L8 22L10 16L6 14L10 12L8 6L12 8Z" fill="currentColor" opacity="0.3" />
          <path d="M16 8L18 12L22 11L20 15L24 16L20 17L21 21L18 19L16 24L14 19L11 21L12 17L8 16L12 15L10 11L14 12Z" fill="currentColor" opacity="0.5" />
        </svg>
        <div className="w-2 h-2 rotate-45 bg-gold/60" />
      </div>

      {(variant === "right" || variant === "both") && (
        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="text-gold/40">
          <path d="M2 12C10 12 15 4 25 4C32 4 35 8 40 12C45 16 48 20 55 20C65 20 70 12 78 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="78" cy="12" r="2" fill="currentColor" />
          <path d="M20 4L25 1L23 6" fill="currentColor" opacity="0.6" />
        </svg>
      )}
    </div>
  );
}
