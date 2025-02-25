import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGamesByTag } from '../services/api';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

function TagGames() {
  const { id } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const gamesPerPage = 20;

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        const data = await getGamesByTag(id, currentPage, gamesPerPage);
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / gamesPerPage));
      } catch (err) {
        setError('Error al cargar los juegos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [id, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="text-white text-center">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-game min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">Juegos por Tag</h1>
      {games && games.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </div>
        </>
      ) : (
        <p className="text-white text-center">No se encontraron juegos para este tag.</p>
      )}
    </div>
  );
}

export default TagGames;