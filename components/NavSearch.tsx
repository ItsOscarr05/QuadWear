"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UNIVERSITIES } from "@/lib/universities";
import { MAJORS } from "@/lib/majors";
import { EmptySearchHint } from "@/components/empty-state";

export default function NavSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { universities, majors } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        universities: [] as typeof UNIVERSITIES,
        majors: [] as typeof MAJORS,
      };
    }
    // Match on full school names only—not abbreviations or slug shortcuts (e.g. "jmu")
    const universities = UNIVERSITIES.filter((u) =>
      u.fullName.toLowerCase().includes(q),
    );
    const majors = MAJORS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.slug.replace(/-/g, " ").includes(q),
    );
    return { universities, majors };
  }, [query]);

  const hasResults = universities.length > 0 || majors.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goUniversity = (slug: string) => {
    router.push(`/shop/university/${slug}`);
    setQuery("");
    setOpen(false);
  };

  const goMajor = (slug: string) => {
    router.push(`/shop/major/${slug}`);
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!query.trim()) return;
    if (universities.length > 0) {
      goUniversity(universities[0].slug);
      return;
    }
    if (majors.length > 0) {
      goMajor(majors[0].slug);
    }
  };

  const showDropdown = open && query.trim().length > 0;

  /* Right cluster beside cart: fixed max width — do not flex-grow or it overlaps viewport-centered nav */
  return (
    <div
      ref={containerRef}
      className="relative w-[min(100%,16rem)] shrink-0 sm:w-[min(100%,17rem)] md:w-[min(100%,18rem)] lg:w-[min(100%,22rem)] xl:w-[min(100%,26.5rem)] max-w-[425px]"
    >
      <label htmlFor="nav-search" className="sr-only">
        Search universities and majors
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          id="nav-search"
          type="search"
          autoComplete="off"
          placeholder="Universities & majors…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border-4 border-black bg-white py-2 pl-9 pr-3 text-sm font-semibold text-black placeholder:text-gray-500 focus:border-primary focus:outline-none"
        />
      </div>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-72 overflow-y-auto rounded-lg border-4 border-black bg-white shadow-lg"
          role="listbox"
        >
          {!hasResults ? (
            <div className="px-1 py-1">
              <EmptySearchHint className="!py-3" />
            </div>
          ) : (
            <>
              {universities.length > 0 && (
                <div>
                  <p className="sticky top-0 bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-700">
                    Universities
                  </p>
                  <ul>
                    {universities.map((u) => (
                      <li key={u.slug}>
                        <button
                          type="button"
                          role="option"
                          className="w-full px-3 py-2 text-left text-sm font-semibold text-black hover:bg-primary hover:text-white"
                          onClick={() => goUniversity(u.slug)}
                        >
                          {u.fullName}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {majors.length > 0 && (
                <div>
                  <p className="sticky top-0 bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gray-700">
                    Majors
                  </p>
                  <ul>
                    {majors.map((m) => (
                      <li key={m.slug}>
                        <button
                          type="button"
                          role="option"
                          className="w-full px-3 py-2 text-left text-sm font-semibold text-black hover:bg-primary hover:text-white"
                          onClick={() => goMajor(m.slug)}
                        >
                          {m.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
