import React, { useEffect, useState } from 'react';
import { getPopularGames } from '../services/api';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchGames() {
      const data = await getPopularGames();
      setGames(data);
      setFilteredGames(data); // Inicialmente, muestra todos los juegos
    }
    fetchGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [games]);

  const handleSearch = (query) => {
    const filtered = games.filter((game) =>
      game.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  return (
    <div className='bg-game'>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">Juegos Populares</h1>
        
        {/* Carrusel */}
        <div className="relative w-full h-64 overflow-hidden mb-6 rounded-lg">
          {games.length > 0 && (
            
            <img 
              src={games[currentIndex].background_image} 
              alt={games[currentIndex].name} 
              className="relative w-full h-64 overflow-hidden mb-6 rounded-lg bg-gray-800"

            />
          )}
          
          </div>

        {/* Barra de búsqueda */}
        <SearchBar onSearch={handleSearch} />
        
        {/* Lista de juegos filtrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
