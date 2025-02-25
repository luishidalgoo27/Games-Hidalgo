import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import TagGames from './components/TagGames';
import PublisherDetails from './components/PublisherDetails';
import PublisherSearch from './pages/GameDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetails />} />
      <Route path="/tag/:id" element={<TagGames />} />
      <Route path="/publisher/:id" element={<PublisherDetails />} />
      <Route path="/publishers" element={<PublisherSearch />} />
    </Routes>
  );
}



export default App;
