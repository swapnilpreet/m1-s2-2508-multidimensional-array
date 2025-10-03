import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Helper to fetch popular videos for the Home Page
export const fetchPopularVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'US', // Can be changed
        maxResults: 25,
        key: API_KEY,
      },
    });
    // The statistics part (likes, views) is often missing on the first popular videos call.
    // In a real app, you'd make a subsequent batch call to get full statistics, 
    // but for MVP, we rely on what the 'list' returns.
    return response.data.items; 
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
};

// Helper to fetch details and related videos for the Watch Page
export const fetchVideoDetailsAndRelated = async (videoId) => {
  try {
    // 1. Fetch details (title, description, full stats)
    const detailResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: API_KEY,
      },
    });

    // 2. Fetch related videos for the sidebar
    const relatedResponse = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        type: 'video',
        maxResults: 10,
        key: API_KEY,
      },
    });

    return {
      details: detailResponse.data.items[0],
      suggestions: relatedResponse.data.items,
    };
  } catch (error) {
    console.error('Error fetching video details and related videos:', error);
    return { details: null, suggestions: [] };
  }
};