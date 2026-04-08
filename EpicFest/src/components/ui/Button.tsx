"use client";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-dark-900 hover:bg-gold-light active:bg-gold-dark font-bold shadow-lg shadow-gold/10 hover:shadow-gold/20",
  secondary:
    "bg-dark-600 text-parchment hover:bg-dark-500 border border-border-subtle",
  outline:
    "border-2 border-gold text-gold hover:bg-gold/10 active:bg-gold/20",
  ghost: "text-gold hover:bg-gold/10 active:bg-gold/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded font-[family-name:var(--font-body)] uppercase tracking-widest transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {children}
    </button>
  );
}
