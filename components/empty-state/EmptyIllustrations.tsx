/**
 * Empty-state visuals use Lucide icons (MIT, https://lucide.dev — install: `lucide-react`).
 * Graduation caps support school theme colors + tilt when `primaryColor` is passed (or default `text-primary`).
 */

import {
  BookOpen,
  GraduationCap,
  PackageSearch,
  SearchX,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

type IconSlotProps = {
  className?: string;
};

type SchoolAccentProps = IconSlotProps & {
  primaryColor?: string;
};

const stroke = 2.25;

/** Shared: tilted grad cap with optional school primary stroke color. */
function GradCapSchoolAccent({
  className = "h-28 w-28 shrink-0",
  primaryColor,
}: SchoolAccentProps) {
  const hasCustom = Boolean(primaryColor);

  return (
    <span
      className={`inline-flex -rotate-[14deg] ${
        hasCustom ? "" : "text-primary"
      }`}
      style={hasCustom ? { color: primaryColor } : undefined}
    >
      <GraduationCap className={className} strokeWidth={stroke} aria-hidden />
    </span>
  );
}

export function IllustrationCartEmpty({ className }: IconSlotProps) {
  return (
    <ShoppingCart
      className={className}
      strokeWidth={stroke}
      aria-hidden
    />
  );
}

export function IllustrationHangerEmpty({
  className = "h-28 w-28 shrink-0",
  primaryColor,
}: SchoolAccentProps) {
  return (
    <GradCapSchoolAccent className={className} primaryColor={primaryColor} />
  );
}

export function IllustrationSearchEmpty({ className }: IconSlotProps) {
  return (
    <SearchX className={className} strokeWidth={stroke} aria-hidden />
  );
}

export function IllustrationSparkles({ className }: IconSlotProps) {
  return (
    <Sparkles className={className} strokeWidth={stroke} aria-hidden />
  );
}

export function IllustrationSchoolMissing({
  className = "h-28 w-28 shrink-0",
  primaryColor,
}: SchoolAccentProps) {
  return (
    <GradCapSchoolAccent className={className} primaryColor={primaryColor} />
  );
}

export function IllustrationBookMissing({ className }: IconSlotProps) {
  return (
    <BookOpen className={className} strokeWidth={stroke} aria-hidden />
  );
}

export function IllustrationShirtMystery({ className }: IconSlotProps) {
  return (
    <PackageSearch className={className} strokeWidth={stroke} aria-hidden />
  );
}
