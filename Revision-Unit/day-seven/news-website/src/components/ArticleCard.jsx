import React from "react";
import dayjs from "dayjs";

const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='315'><rect width='100%' height='100%' fill='#e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='sans-serif' font-size='20'>No Image</text></svg>`
)}`;

export default function ArticleCard({ article, onToggleBookmark, saved }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg transition">
      <div className="relative">
        <img
          src={article.urlToImage || placeholder}
          alt={article.title}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        <button
          onClick={() => onToggleBookmark(article)}
          className={`absolute top-2 right-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            saved ? "bg-emerald-600 text-white" : "bg-black/70 text-white"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="p-4 space-y-2">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <h3 className="text-base font-semibold line-clamp-2 hover:underline text-zinc-300">
            {article.title}
          </h3>
        </a>
        {article.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
            {article.description}
          </p>
        )}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex gap-2">
          <span>{article.author ? `By ${article.author}` : "Unknown"}</span>
          <span>•</span>
          <span>
            {article.publishedAt
              ? dayjs(article.publishedAt).format("MMM D, YYYY h:mm A")
              : ""}
          </span>
        </div>
      </div>
    </article>
  );
}
