import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Album from './components/Album';
import Search from './components/Search';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Favorites from './components/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search/*" element={ <Layout /> }>
        <Route index element={ <Search /> } />
      </Route>
      <Route path="/album/:id" element={ <Layout /> }>
        <Route index element={ <Album /> } />
      </Route>
      <Route path="/profile" element={ <Layout /> }>
        <Route index element={ <Profile /> } />
        <Route path="edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/favorites" element={ <Layout /> }>
        <Route index element={ <Favorites /> } />
      </Route>
    </Routes>
  );
}

export default App;
