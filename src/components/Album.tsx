import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { SongType } from '../types';

function Album() {
  const { id: albumId } = useParams();
  const okId = albumId || '';
  const [albumInfo, setAlbumInfo] = useState({
    artistName: '',
    collectionName: '',
  });
  const [musics, setMusics] = useState<SongType[]>([]);
  const [favoriteMusics, setFavoriteMusics] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const isMusicFavorited = (trackId: number) => {
    return favoriteMusics.includes(trackId);
  };

  const handleFavoriteToggle = (trackId: number) => {
    if (isMusicFavorited(trackId)) {
      setFavoriteMusics(favoriteMusics.filter(
        (id) => id !== trackId,
      ));
    } else {
      setFavoriteMusics([...favoriteMusics, trackId]);
    }
  };

  useEffect(() => {
    async function fetchAlbumAndMusics() {
      try {
        const response = await getMusics(okId);
        const firstEntry = response[0];

        if ('artistName' in firstEntry && 'collectionName' in firstEntry) {
          setAlbumInfo(firstEntry);
        }

        const albumMusics = response.slice(1) as SongType[];
        setMusics(albumMusics);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar álbum e músicas:', error);
        setLoading(false);
      }
    }

    fetchAlbumAndMusics();
  }, [okId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Álbum</h1>
      <p data-testid="artist-name">{albumInfo.artistName}</p>
      <p data-testid="album-name">{albumInfo.collectionName}</p>

      <h2>Músicas do Álbum</h2>
      {musics.map((music) => (
        <MusicCard
          key={ music.trackId }
          music={ music }
          isFavorite={ isMusicFavorited(music.trackId) }
          onFavoriteToggle={ handleFavoriteToggle }
        />
      ))}
    </div>
  );
}

export default Album;
