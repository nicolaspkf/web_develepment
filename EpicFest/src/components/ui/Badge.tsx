import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "red" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-[family-name:var(--font-body)] font-medium",
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        variant === "default" && "bg-dark-500 text-parchment-dark",
        variant === "gold" && "bg-gold/20 text-gold border border-gold/30",
        variant === "red" && "bg-blood/20 text-blood-bright border border-blood/30",
        variant === "outline" && "border border-border text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
