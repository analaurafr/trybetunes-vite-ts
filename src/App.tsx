import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Album from './components/Album';
import Search from './components/Search';

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
    </Routes>
  );
}

export default App;
