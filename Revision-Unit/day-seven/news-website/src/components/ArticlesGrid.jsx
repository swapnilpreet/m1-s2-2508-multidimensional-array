import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticlesGrid({ articles, onToggleBookmark, isSaved }) {
  if (!articles || articles.length === 0) {
    return <p className="text-center text-zinc-500">No articles found.</p>;
  }
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((a) => (
        <ArticleCard
          key={a.url}
          article={a}
          onToggleBookmark={onToggleBookmark}
          saved={isSaved(a.url)}
        />
      ))}
    </section>
  );
}
