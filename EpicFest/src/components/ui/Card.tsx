import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  ornate?: boolean;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export default function Card({
  children,
  className,
  ornate = false,
  hover = false,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "relative rounded-lg bg-dark-600 overflow-hidden",
        ornate && "border border-border-ornate",
        !ornate && "border border-border-subtle",
        hover &&
          "transition-all duration-300 hover:border-gold hover:glow-gold hover:scale-[1.02]",
        className
      )}
    >
      {ornate && (
        <>
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold rounded-tr" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold rounded-bl" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br" />
        </>
      )}
      {children}
    </Component>
  );
}
