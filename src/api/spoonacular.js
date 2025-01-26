import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query, tags = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        tags,
        addRecipeInformation: true,
        number: 12
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe details');
  }
};