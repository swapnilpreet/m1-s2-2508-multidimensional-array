import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import ArticlesGrid from "./components/ArticlesGrid";
import BookmarksDrawer from "./components/BookmarksDrawer";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY || "us";

const saveLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const loadLS = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};

export default function App() {
  const [category, setCategory] = useState("business");
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [mode, setMode] = useState("headlines");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookmarks, setBookmarks] = useState(() => loadLS("bookmarks", []));
  useEffect(() => saveLS("bookmarks", bookmarks), [bookmarks]);

  const isSaved = (url) => bookmarks.some((b) => b.url === url);
  const toggleBookmark = (article) => {
    setBookmarks((curr) => {
      const exists = curr.find((x) => x.url === article.url);
      if (exists) return curr.filter((x) => x.url !== article.url);
      return [{ ...article }, ...curr].slice(0, 200);
    });
  };
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError("");
  }, [category, country, mode, query, sortBy]);

  const endpointInfo = useMemo(() => {
    if (mode === "search" && query.trim()) {
      return {
        url: "/everything",
        params: { q: query, sortBy, pageSize: 12, page },
      };
    }
    return {
      url: "/top-headlines",
      params: { country, category, pageSize: 12, page },
    };
  }, [mode, query, sortBy, country, category, page]);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(endpointInfo.url, {
          params: endpointInfo.params,
        });
        if (cancelled) return;
        const newArticles = data.articles || [];
        setArticles((prev) =>
          endpointInfo.params.page === 1
            ? newArticles
            : [...prev, ...newArticles]
        );
        setTotalResults(data.totalResults || 0);
        setHasMore(newArticles.length >= (endpointInfo.params.pageSize || 12));
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch"
        );
        setHasMore(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [endpointInfo.url, JSON.stringify(endpointInfo.params)]);

  const handleSearch = ({ q, sort }) => {
    setQuery(q || "");
    setSortBy(sort || "publishedAt");
    setMode((q || "").trim() ? "search" : "headlines");
    setPage(1);
  };

  const sentinelRef = useRef();
  useInfiniteScroll({
    sentinelRef,
    onLoadMore: () => {
      if (!loading && hasMore) setPage((p) => p + 1);
    },
    canLoad: hasMore,
  });

  useEffect(() => {}, [page]);

  return (
    <div className="min-h-screen">
      <Navbar
        category={category}
        setCategory={(c) => {
          setCategory(c);
          setMode("headlines");
        }}
        country={country}
        setCountry={(c) => {
          setCountry(c);
          setMode("headlines");
        }}
        onSearch={handleSearch}
        q={query}
        setQ={setQuery}
        openBookmarks={() => setShowBookmarks((s) => !s)}
        bookmarksCount={bookmarks.length}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "search"
              ? `Results for “${query || "news"}” (${totalResults || 0})`
              : `Top headlines · ${country.toUpperCase()} · ${category}`}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-800">
            {error}
          </div>
        )}

        <ArticlesGrid
          articles={articles}
          onToggleBookmark={toggleBookmark}
          isSaved={isSaved}
        />

        {loading && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl overflow-hidden border p-4"
              >
                <div className="h-44 bg-zinc-200 dark:bg-zinc-800 mb-3"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 mb-2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        <div
          ref={sentinelRef}
          className="h-12 flex items-center justify-center text-sm text-zinc-500 mt-6"
        >
          {hasMore
            ? loading
              ? "Loading…"
              : "Scroll to load more"
            : "No more articles"}
        </div>
      </main>

      <BookmarksDrawer
        open={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarks={bookmarks}
        onToggleBookmark={toggleBookmark}
      />

      <footer className="py-10 text-center text-xs text-zinc-500">
        <p>Powered by NewsAPI.org</p>
      </footer>
    </div>
  );
}
