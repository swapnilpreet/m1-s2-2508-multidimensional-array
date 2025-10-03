import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

console.log("API Key:", API_KEY);
export const fetchPopularVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 25,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
};

export const fetchVideoDetailsAndRelated = async (videoId) => {
  if (!videoId) {
    console.error("fetchVideoDetailsAndRelated: videoId is missing!");
    return { details: null, suggestions: [] };
  }

  try {
    const detailResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: API_KEY,
      },
    });

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
      details: detailResponse.data.items?.[0] || null,
      suggestions: relatedResponse.data.items || [],
    };
  } catch (error) {
    console.error('Error fetching video details and related videos:', error.response?.data || error.message);
    return { details: null, suggestions: [] };
  }
};