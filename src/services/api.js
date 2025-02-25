const API_KEY = '5d998bb34cb941e28bae504a93382354';
const BASE_URL = 'https://api.rawg.io/api';

export async function getPopularGames(page = 1, pageSize = 20) {
  try {
    // Añadimos ordering=-rating para obtener los mejor valorados primero
    // y metacritic para asegurarnos de que son juegos populares/conocidos
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&ordering=-rating&metacritic=80,100`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    // Forzamos un máximo de 10 páginas
    return {
      ...data,
      count: Math.min(data.count, pageSize * 10) // Limitar a 10 páginas
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { results: [], count: 0 };
  }
}

export async function searchGames(query, page = 1, pageSize = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&search=${query}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching games:", error);
    return { results: [], count: 0 };
  }
}
export async function getGamesByTag(tagId, page = 1, pageSize = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=${pageSize}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games by tag:", error);
    return { results: [], count: 0 };
  }
}

export async function getPublisherDetails(publisherId) {
  try {
    const response = await fetch(
      `${BASE_URL}/publishers/${publisherId}?key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching publisher details:", error);
    return null;
  }
}

export async function getGamesByPublisher(publisherId, page = 1, pageSize = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/games?key=${API_KEY}&publishers=${publisherId}&page=${page}&page_size=${pageSize}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games by publisher:", error);
    return { results: [], count: 0 };
  }
}

export async function searchPublishers(query, page = 1, pageSize = 20) {
  const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page=${page}&page_size=${pageSize}`);
  return await response.json();
}
