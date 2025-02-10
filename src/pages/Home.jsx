import React, { useEffect, useState } from 'react';
import { getPopularGames } from '../services/api';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await getPopularGames();
      setGames(data);
      setFilteredGames(data); // Inicialmente, muestra todos los juegos
    }
    fetchGames();
  }, []);

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