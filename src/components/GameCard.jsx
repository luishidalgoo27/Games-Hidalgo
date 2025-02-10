import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HeartIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

function GameCard({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
      <div className="relative">
        <img 
          src={imageError ? '/placeholder-game.jpg' : game.background_image} 
          alt={game.name} 
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full hover:bg-red-500 transition-colors"
        >
          <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-300'}`} />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold truncate">{game.name}</h2>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span>{game.rating || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <CalendarIcon className="w-5 h-5 text-blue-400" />
          <span>{game.released || 'Fecha desconocida'}</span>
        </div>

        {game.genres && (
          <div className="flex flex-wrap gap-2">
            {game.genres.slice(0, 3).map(genre => (
              <span 
                key={genre.id}
                className="px-2 py-1 bg-gray-700 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <Link 
          to={`/game/${game.id}`} 
          className="block w-full mt-3 text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Detalles
        </Link>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string,
    rating: PropTypes.number,
    released: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    ),
    platforms: PropTypes.array,
  }).isRequired,
};

export default GameCard;