const API_KEY = '5d998bb34cb941e28bae504a93382354';
const BASE_URL = 'https://api.rawg.io/api/games';

export const getPopularGames = async () => {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Error al obtener los juegos');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
