import type { ReactNode } from "react";
import {
  IllustrationBookMissing,
  IllustrationCartEmpty,
  IllustrationHangerEmpty,
  IllustrationSchoolMissing,
  IllustrationSearchEmpty,
  IllustrationShirtMystery,
  IllustrationSparkles,
} from "./EmptyIllustrations";

export type EmptyStateSize = "default" | "compact";

export interface EmptyStateProps {
  title: string;
  description?: string;
  visual?: ReactNode;
  children?: ReactNode;
  size?: EmptyStateSize;
  className?: string;
}

const visualClass = {
  default: "h-28 w-28 shrink-0 text-primary",
  compact: "h-14 w-14 shrink-0 text-primary",
};

/** Size-only for grad cap (color comes from school theme or `text-primary` inside illustration). */
const gradCapClass = "h-28 w-28 shrink-0";

const shellClass = {
  default: "w-full py-8 sm:py-12",
  compact: "w-full py-2",
};

/**
 * On-brand empty state: Lucide icon + playful copy, flush on the page (no card frame).
 */
export default function EmptyState({
  title,
  description,
  visual,
  children,
  size = "default",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center text-center ${shellClass[size]} ${className}`}
    >
      <div
        className={`flex w-full flex-col items-center ${
          size === "compact" ? "max-w-[20rem]" : "max-w-md"
        }`}
      >
        {visual && (
          <div className="mb-4 flex w-full justify-center sm:mb-5">
            {visual}
          </div>
        )}
        <h3
          className={`font-heading font-bold text-black ${
            size === "compact" ? "text-base" : "text-xl md:text-2xl"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={`text-black/75 font-body ${
              size === "compact"
                ? "mt-1 text-sm"
                : "mt-2 text-base md:text-lg"
            }`}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className={
              size === "compact"
                ? "mt-3 flex w-full flex-wrap justify-center gap-2"
                : "mt-6 flex w-full flex-wrap justify-center gap-3"
            }
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/** Preset: shopping cart with nothing in it */
export function EmptyStateCart({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <EmptyState
      className={className}
      visual={<IllustrationCartEmpty className={visualClass.default} />}
      title="Your cart’s on coffee break"
      description="Nothing in here yet—fill it with tees that get your major."
    >
      {children}
    </EmptyState>
  );
}

/** Preset: no products (grid / filters) */
export function EmptyStateCatalog({
  title = "Fresh racks, zero shirts (for now)",
  description = "We’re sketching more designs. Peek another school, major, or swing back soon.",
  className,
  children,
  schoolPrimaryColor,
}: {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  schoolPrimaryColor?: string;
}) {
  return (
    <EmptyState
      className={className}
      visual={
        <IllustrationHangerEmpty
          className={gradCapClass}
          primaryColor={schoolPrimaryColor}
        />
      }
      title={title}
      description={description}
    >
      {children}
    </EmptyState>
  );
}

/** Preset: PDP slug not found */
export function EmptyStateProductMissing({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <EmptyState
      className={className}
      visual={<IllustrationShirtMystery className={visualClass.default} />}
      title="This tee went off-map"
      description="That product isn’t here—maybe it graduated early. Try the shop hub."
    >
      {children}
    </EmptyState>
  );
}

/** Preset: invalid university slug */
export function EmptyStateSchoolMissing({
  className,
  children,
  schoolPrimaryColor,
}: {
  className?: string;
  children?: ReactNode;
  schoolPrimaryColor?: string;
}) {
  return (
    <EmptyState
      className={className}
      visual={
        <IllustrationSchoolMissing
          className={gradCapClass}
          primaryColor={schoolPrimaryColor}
        />
      }
      title="Campus not in our yearbook"
      description="We don’t recognize that school link yet. Pick one we carry!"
    >
      {children}
    </EmptyState>
  );
}

/** Preset: invalid major slug */
export function EmptyStateMajorMissing({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <EmptyState
      className={className}
      visual={<IllustrationBookMissing className={visualClass.default} />}
      title="Major not on the syllabus"
      description="That major isn’t in our catalog yet. Browse the list and try again."
    >
      {children}
    </EmptyState>
  );
}

/** Preset: home featured — no products from API */
export function EmptyStateFeatured({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <EmptyState
      className={className}
      visual={<IllustrationSparkles className={visualClass.default} />}
      title="Trending looks loading…"
      description="New drops hit here first. Check back after we stock the racks—or explore the shop."
    >
      {children}
    </EmptyState>
  );
}

/** Compact: nav search dropdown */
export function EmptySearchHint({ className }: { className?: string }) {
  return (
    <EmptyState
      size="compact"
      className={className}
      visual={<IllustrationSearchEmpty className={visualClass.compact} />}
      title="No matches (yet)"
      description="Try a school’s full name or a major—spelling counts, vibes optional."
    />
  );
}
