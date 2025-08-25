import React, { useState } from "react";

const SORTS = [
  { value: "publishedAt", label: "Published" },
  { value: "relevancy", label: "Relevancy" },
  { value: "popularity", label: "Popularity" },
];

export default function SearchBar({ q, setQ, onSearch }) {
  const [sort, setSort] = useState("publishedAt");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch({ q, sort });
      }}
      className="flex gap-2"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search news, e.g., bitcoin"
        className="flex-1 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white cursor-pointer"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white cursor-pointer"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white cursor-pointer">
        Search
      </button>
      <button
        type="button"
        onClick={() => {
          setQ("");
          onSearch({ q: "", sort });
        }}
        className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer"
      >
        Clear
      </button>
    </form>
  );
}
