import React from "react";
import ArticleCard from "./ArticleCard";

export default function BookmarksDrawer({
  open,
  onClose,
  bookmarks,
  onToggleBookmark,
}) {
  if (!open) return null;
  return (
    <aside className="fixed inset-0 flex z-50" onClick={onClose}>
      <div
        className="ml-auto h-full w-full max-w-xl bg-white  border-l border-zinc-200  p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">
            Bookmarks ({bookmarks.length})
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1.5 border rounded cursor-pointer"
          >
            Close
          </button>
        </div>
        {bookmarks.length === 0 && (
          <p className="text-sm text-zinc-500">No saved articles.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bookmarks.map((b) => (
            <ArticleCard
              key={b.url}
              article={b}
              onToggleBookmark={onToggleBookmark}
              saved={true}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
