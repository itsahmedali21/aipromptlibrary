"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MagneticWrap } from "./magnetic-wrap";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-text-on hover:bg-accent-strong shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset]",
  secondary: "bg-surface-2 text-text-primary border border-border-strong hover:bg-surface-hover",
  ghost: "bg-transparent text-text-primary hover:bg-surface-2",
  outline: "bg-transparent text-text-primary border border-border-strong hover:border-accent/50 hover:text-accent",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2.5 py-3.5",
};

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(
    "relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-all duration-[var(--dur-fast)] ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, iconPosition = "right", magnetic = false, className, children, ...props },
  ref
) {
  const content = (
    <button ref={ref} className={classesFor(variant, size, className)} {...props}>
      {icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="shrink-0">{icon}</span> : null}
    </button>
  );
  return magnetic ? <MagneticWrap>{content}</MagneticWrap> : content;
});

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  magnetic = false,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  const content = (
    <Link href={href} className={classesFor(variant, size, className)} {...rest}>
      {icon && iconPosition === "left" ? <span className="shrink-0">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="shrink-0">{icon}</span> : null}
    </Link>
  );
  return magnetic ? <MagneticWrap>{content}</MagneticWrap> : content;
}
