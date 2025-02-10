import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import { fetchGames } from '../services/api';

const Games = () => {
  const [games, setGames] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    fetchGames(searchQuery).then((data) => setGames(data.results));
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;