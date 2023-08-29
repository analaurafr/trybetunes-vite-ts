import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Album from './components/Album';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <Album /> } />
    </Routes>
  );
}

export default App;
