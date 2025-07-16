import api from './api.js';

const getPersonalizedRecommendations = async () => {
  const { data } = await api.get('/api/recommendations');
  return data;
};

const getSymptomRecommendations = async (symptoms) => {
  const { data } = await api.get(`/api/recommendations/symptoms?symptoms=${symptoms}`);
  return data;
};

const recommendationService = {
  getPersonalizedRecommendations,
  getSymptomRecommendations,
};

export default recommendationService;