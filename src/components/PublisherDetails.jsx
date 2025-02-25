import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublisherDetails, getGamesByPublisher } from '../services/api';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

function PublisherDetails() {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const gamesPerPage = 20;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const publisherData = await getPublisherDetails(id);
        setPublisher(publisherData);

        const gamesData = await getGamesByPublisher(id, currentPage, gamesPerPage);
        setGames(gamesData.results);
        setTotalPages(Math.ceil(gamesData.count / gamesPerPage));
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="text-white text-center">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-game min-h-screen p-4">
      {publisher && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">{publisher.name}</h1>
          <p className="text-center text-amber-50 mb-6">{publisher.description}</p>
        </>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center text-amber-50">Juegos de este Publisher</h2>
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
        <p className="text-white text-center">No se encontraron juegos para este publisher.</p>
      )}
    </div>
  );
}

export default PublisherDetails;