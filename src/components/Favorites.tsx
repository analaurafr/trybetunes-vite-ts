import { useEffect, useState } from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import { SongType } from '../types';

function Favorites() {
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteSongs() {
      try {
        const favoriteSongsResponse = await getFavoriteSongs();
        setFavoriteMusics(favoriteSongsResponse);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar músicas favoritas:', error);
        setLoading(false);
      }
    }

    fetchFavoriteSongs();
  }, []);

  const handleFavoriteToggle = async (trackId: number) => {
    try {
      const musicToRemove = favoriteMusics.find((music) => music.trackId === trackId);
      if (musicToRemove) {
        await removeSong(musicToRemove);
        setFavoriteMusics((
          prevFavorites,
        ) => prevFavorites.filter((music) => music.trackId !== trackId));
      }
    } catch (error) {
      console.error('Erro ao remover música favorita:', error);
    }
  };

  return (
    <div>
      <h1>Músicas Favoritas</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        favoriteMusics.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            isFavorite
            onFavoriteToggle={ () => handleFavoriteToggle(music.trackId) }
          />
        ))
      )}
    </div>
  );
}

export default Favorites;
