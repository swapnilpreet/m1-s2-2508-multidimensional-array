import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

const CATEGORIES = [
  "business",
  "sports",
  "technology",
  "health",
  "entertainment",
  "science",
];

const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "in", name: "India" },
  { code: "gb", name: "United Kingdom" },
  { code: "au", name: "Australia" },
  { code: "ca", name: "Canada" },
];
export default function Navbar({
  category,
  setCategory,
  country,
  setCountry,
  onSearch,
  q,
  setQ,
  openBookmarks,
  bookmarksCount,
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-zinc-900/70 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 py-3">
          <h1 className="text-xl md:text-2xl font-bold">
            News<span className="text-emerald-500">Now</span>
          </h1>

          <nav className="hidden md:flex items-center gap-2 ml-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                  category === c
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-zinc-100  text-white dark:hover:bg-zinc-800"
                }`}
              >
                {c}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-1.5 rounded-full text-sm border border-zinc-200 dark:border-zinc-700 bg-white cursor-pointer"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={openBookmarks}
              className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 cursor-pointer "
            >
              Bookmarks {bookmarksCount}
            </button>

            <ThemeToggle />
          </div>
        </div>

        <div className="pb-3 ">
          <SearchBar q={q} setQ={setQ} onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}
