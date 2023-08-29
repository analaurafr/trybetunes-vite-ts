import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import Music from './Music';
import { AlbumType, SongType } from '../types';

function Album() {
  const { id } = useParams();
  const okId = id || '';
  const [albumInfo, setAlbumInfo] = useState<{
    artistName: string;
    collectionName: string
  }>({
    artistName: '',
    collectionName: '',
  });

  const [musics, setMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

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
        <Music
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ 0 }
        />
      ))}
    </div>
  );
}

export default Album;
