import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
  variant?: "sword" | "simple" | "ornate";
}

export default function OrnamentalDivider({
  className,
  variant = "simple",
}: OrnamentalDividerProps) {
  if (variant === "sword") {
    return (
      <div className={cn("flex items-center justify-center gap-4", className)}>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold-muted" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gold"
        >
          <path
            d="M12 2L14 8H10L12 2ZM12 22L10 16H14L12 22ZM12 8V16M8 12H16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold-muted" />
      </div>
    );
  }

  if (variant === "ornate") {
    return (
      <div className={cn("flex items-center justify-center gap-3", className)}>
        <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-gold-muted" />
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="w-2 h-2 rotate-45 bg-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
        </div>
        <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-gold-muted" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-border-subtle" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
      <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-border-subtle" />
    </div>
  );
}
