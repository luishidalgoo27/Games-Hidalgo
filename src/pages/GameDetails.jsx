import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=5d998bb34cb941e28bae504a93382354`);
        if (!response.ok) throw new Error('Error al obtener detalles del juego');
        
        const data = await response.json();
        setGame(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    }
    fetchGame();
  }, [id]);

  if (loading) return <p className="text-center text-lg font-semibold">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">No se pudo cargar el juego.</p>;

  return (
    <div className="min-h-screen bg-game text-white flex flex-col items-center py-10 px-5">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-5 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
      >
        ← Volver
      </button>

      <div className="max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">{game.name}</h1>

        <img 
          src={game.background_image} 
          alt={game.name} 
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎮 Géneros</h3>
            <p>{game.genres.map(g => g.name).join(', ') || 'No disponible'}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">⭐ Puntuación</h3>
            <p>{game.rating || 'No disponible'}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">📅 Fecha de lanzamiento</h3>
            <p>{game.released || 'No disponible'}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🏷️ Tags</h3>
          <p>
            {game.tags.map((tag) => (
              <Link 
                key={tag.id} 
                to={`/tag/${tag.id}`}
                className="inline-block bg-purple-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-purple-700"
              >
                {tag.name}
              </Link>
            ))}
          </p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🏢 Publisher</h3>
          <p>
            {game.publishers.map((publisher) => (
              <Link 
                key={publisher.id} 
                to={`/publisher/${publisher.id}`}
                className="text-blue-400 hover:underline"
              >
                {publisher.name}
              </Link>
            ))}
          </p>
        </div>

        {/* Plataformas ya estaban incluidas, pero las dejamos aquí para referencia */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🕹️ Plataformas</h3>
          <p>{game.platforms.map(p => p.platform.name).join(', ') || 'No disponible'}</p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
