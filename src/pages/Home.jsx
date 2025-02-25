import React, { useEffect, useState } from 'react';
import { getPopularGames, searchGames } from '../services/api';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Home() {
  const [games, setGames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const gamesPerPage = 20;
  const maxPages = 10;

  useEffect(() => {
    fetchGames();
  }, [currentPage, searchQuery]);

  async function fetchGames() {
    try {
      setIsLoading(true);
      setError(null);
      let data;
      if (searchQuery) {
        data = await searchGames(searchQuery, currentPage, gamesPerPage);
      } else {
        data = await getPopularGames(currentPage, gamesPerPage);
      }
      
      if (data && data.results) {
        setGames(data.results);
        setTotalPages(Math.min(Math.ceil(data.count / gamesPerPage), maxPages));
      } else {
        throw new Error('No se recibieron datos válidos de la API');
      }
    } catch (err) {
      console.error('Error al cargar los juegos:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let interval;
    if (games.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [games]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className='bg-game min-h-screen'>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-amber-50">
          {searchQuery ? 'Resultados de búsqueda' : 'Juegos Mejor Valorados'}
        </h1>
        
        {/* Carrusel (solo se muestra si no hay búsqueda activa) */}
        {!searchQuery && games.length > 0 && (
          <div className="relative w-full h-64 overflow-hidden mb-6 rounded-lg">
            <img 
              src={games[currentIndex]?.background_image || "/placeholder.svg"} 
              alt={games[currentIndex]?.name} 
              className="w-full h-64 object-cover rounded-lg bg-gray-800"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <h2 className="text-white text-xl font-bold">{games[currentIndex]?.name}</h2>
              <p className="text-white">Rating: {games[currentIndex]?.rating}/5</p>
            </div>
          </div>
        )}

        {/* Barra de búsqueda */}
        <SearchBar onSearch={handleSearch} />
        
        {/* Estado de carga */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            <p className="text-white mt-2">Cargando juegos...</p>
          </div>
        ) : (
          <>
            {/* Lista de juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Mensaje si no hay resultados */}
            {games.length === 0 && (
              <p className="text-center text-white mt-6">No se encontraron juegos.</p>
            )}

            {/* Paginación */}
            {games.length > 0 && (
              <div className="mt-8 mb-8">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;