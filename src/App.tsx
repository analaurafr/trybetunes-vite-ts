import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import AlbumDetails from './components/AlbumDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route
        path="/album/:id"
        element={ <AlbumDetails
          album={ {
            artistId: 0,
            artistName: '',
            collectionId: 0,
            collectionName: '',
            collectionPrice: 0,
            artworkUrl100: '',
            releaseDate: '',
            trackCount: 0,
          } }
        /> }
      />
    </Routes>
  );
}

export default App;
