import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoDetailsAndRelated } from "../api/youtube";
import VideoCard from "../Components/VideoCard";

const formatCount = (count) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count;
};

export default function Watch() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { details, suggestions: related } =
        await fetchVideoDetailsAndRelated(videoId);
      setVideoDetails(details);
      const videoSuggestions = related.filter(
        (item) => item.id.kind === "youtube#video"
      );
      setSuggestions(videoSuggestions);
      setLoading(false);
    };
    fetchData();
  }, [videoId]);

  if (loading) {
    return <div className="text-white text-center mt-8">Loading video...</div>;
  }

  if (!videoDetails) {
    return (
      <div className="text-red-500 text-center mt-8">
        Video not found or API error.
      </div>
    );
  }

  const { snippet, statistics } = videoDetails;
  const title = snippet.title;
  const description = snippet.description.substring(0, 300) + "...";
  const views = formatCount(statistics.viewCount);
  const likes = formatCount(statistics.likeCount);

  const handleSuggestionClick = (newVideoId) => {
    navigate(`/watch/${newVideoId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:col-span-2">
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
            className="w-full h-full"
          ></iframe>
        </div>
        <h1 className="text-xl font-bold mt-4">{title}</h1>
        <div className="flex justify-between items-center text-gray-400 text-sm mt-2 border-b border-gray-700 pb-3">
          <span className="font-semibold">{views} views</span>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
              <span className="text-lg">👍</span>
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
              <span className="text-lg">👎</span>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-[#272727] p-3 rounded-lg">
          <p className="text-sm whitespace-pre-line">{description}</p>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">
          Suggested Videos
        </h2>
        {suggestions.map((video) => (
          <div
            key={video.id.videoId}
            className="flex space-x-3 cursor-pointer p-2 rounded-lg hover:bg-[#272727]"
            onClick={() => handleSuggestionClick(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="w-1/3 object-cover rounded-lg"
            />
            <div className="w-2/3">
              <h4 className="text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </h4>
              <p className="text-xs text-gray-400">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
