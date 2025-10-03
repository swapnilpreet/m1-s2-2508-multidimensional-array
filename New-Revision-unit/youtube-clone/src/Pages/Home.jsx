import React, { useEffect, useState } from 'react';
import { fetchPopularVideos } from '../api/youtube';
import VideoCard from '../Components/VideoCard';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchPopularVideos();
        // Filter out items that don't have all required data (e.g., deleted videos)
        const validVideos = data.filter(v => v.id && v.snippet && v.statistics);
        setVideos(validVideos);
      } catch (err) {
        setError("Failed to fetch videos. Check API key and quota.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">Recommended</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
        {videos.map((video) => (
          // Using video.id as the key is safe here because it's unique
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}