import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import { AlbumType } from '../types';

function Search() {
  const navigate = useNavigate();
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchedArtist, setSearchedArtist] = useState('');

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleSearch = async () => {
    if (artistName.length >= 2) {
      setLoading(true);
      setAlbums([]);
      setSearchedArtist('');

      try {
        const response = await searchAlbumsAPI(artistName);
        setAlbums(response);
        setSearchedArtist(artistName);
      } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
      } finally {
        setLoading(false);
        setArtistName('');
      }
    }
  };

  return (
    <div>
      <h1>Pesquisar Artista</h1>
      <label>
        Nome do Artista:
        <input
          type="text"
          value={ artistName }
          onChange={ handleArtistNameChange }
          data-testid="search-artist-input"
          disabled={ loading }
        />
      </label>
      <button
        onClick={ handleSearch }
        data-testid="search-artist-button"
        disabled={ artistName.length < 2 || loading }
      >
        Pesquisar
      </button>

      {loading ? (
        <Carregando isLoading={ loading }>Carregando...</Carregando>
      ) : (
        albums.length > 0 && (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              {searchedArtist}
            </p>
            <ul>
              {albums.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    {album.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {albums.length === 0 && !loading && searchedArtist && (
        <p>Nenhum álbum foi encontrado.</p>
      )}
    </div>
  );
}

export default Search;
