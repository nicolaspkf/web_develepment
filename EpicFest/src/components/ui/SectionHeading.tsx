import { cn } from "@/lib/utils";
import OrnamentalDivider from "./OrnamentalDivider";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  divider?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  divider = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      {divider && <OrnamentalDivider className="mb-6" />}
      <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl text-text-heading uppercase tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
