import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl">Explorador de Videojuegos</h1>
      <nav>
        <Link to="/" className="mr-4">Inicio</Link>
      </nav>
    </header>
  );
}

export default Header;
