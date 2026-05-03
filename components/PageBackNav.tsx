import Link from "next/link";

interface PageBackNavProps {
  href: string;
  label: string;
  className?: string;
}

export default function PageBackNav({
  href,
  label,
  className = "",
}: PageBackNavProps) {
  return (
    <Link
      href={href}
      className={`text-sm font-semibold text-primary hover:underline mb-4 inline-block ${className}`}
    >
      {label}
    </Link>
  );
}
