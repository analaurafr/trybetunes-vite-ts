import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams();
  const okId = id || '';
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);

  const [musics, setMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchAlbumAndMusics() {
      try {
        const response = await getMusics(okId);
        const firstEntry = response[0];

        if ('artistName' in firstEntry && 'collectionName' in firstEntry) {
          setAlbumInfo(firstEntry as AlbumType);
        }

        const albumMusics = response.filter((item) => 'trackId' in item) as SongType[];

        setMusics(albumMusics);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar álbum e músicas:', error);
        setLoading(false);
      }
    }

    fetchAlbumAndMusics();
  }, [okId]);

  const isMusicFavorited = (music: SongType) => {
    return favoriteSongs.some((song) => song.trackId === music.trackId);
  };

  const handleFavoriteToggle = (music: SongType) => {
    if (isMusicFavorited(music)) {
      const updatedFavorites = favoriteSongs.filter(
        (song) => song.trackId !== music.trackId,
      );
      setFavoriteSongs(updatedFavorites);
    } else {
      setFavoriteSongs([...favoriteSongs, music]);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes do Álbum</h1>
      {albumInfo && (
        <>
          <p data-testid="artist-name">{albumInfo.artistName}</p>
          <p data-testid="album-name">{albumInfo.collectionName}</p>
        </>
      )}

      <h2>Músicas do Álbum</h2>
      {musics.map((music) => (
        <MusicCard
          key={ music.trackId }
          music={ music }
          isFavorite={ isMusicFavorited(music) }
          onFavoriteToggle={ () => handleFavoriteToggle(music) }
        />
      ))}
    </div>
  );
}

export default Album;
