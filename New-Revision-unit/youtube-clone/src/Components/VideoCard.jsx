import React from "react";
import { Link } from "react-router-dom";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count;
};

const getTimeAgo = (dateString) => {
  return "2 days ago";
};

export default function VideoCard({ video }) {
  if (!video || !video.snippet || !video.id) return null;
  const { snippet, statistics } = video;
  const views = statistics ? formatCount(statistics.viewCount) : "N/A";
  const timestamp = getTimeAgo(snippet.publishedAt);
  const thumbnailURL = snippet.thumbnails.medium.url;

  return (
    <Link
      to={`/watch/${video.id}`}
      className="block w-full text-white cursor-pointer hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="space-y-3">
        <img
          src={thumbnailURL}
          alt={snippet.title}
          className="w-full rounded-xl object-cover aspect-video"
        />
        <div className="flex space-x-3">
          <div className="w-9 h-9 bg-gray-600 rounded-full flex-shrink-0"></div>
          <div className="flex-grow">
            <h3 className="text-sm font-semibold line-clamp-2">
              {snippet.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{snippet.channelTitle}</p>
            <p className="text-xs text-gray-400">
              {views} views • {timestamp}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
