import {
  PenLine,
  Megaphone,
  Palette,
  Code2,
  Search,
  Briefcase,
  GraduationCap,
  Zap,
  FlaskConical,
  Share2,
  type LucideIcon,
} from "lucide-react";

/** Explicit icon registry keyed by name stored in data files. Add new icons here as needed. */
export const iconMap: Record<string, LucideIcon> = {
  PenLine,
  Megaphone,
  Palette,
  Code2,
  Search,
  Briefcase,
  GraduationCap,
  Zap,
  FlaskConical,
  Share2,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Zap;
}

/**
 * Renders an icon looked up by name from the static registry above.
 * Prefer this over `getIcon()` directly in JSX — resolving the icon inside
 * a dedicated component (rather than binding it to a local variable and
 * using that as a JSX tag) keeps icon identity stable across renders.
 */
export function DynamicIcon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name] ?? Zap;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
