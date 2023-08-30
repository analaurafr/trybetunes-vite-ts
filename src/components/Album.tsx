import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';
import Carregando from './Carregando';

function Album() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [albumInfo, setAlbumInfo] = useState<AlbumType>();
  const [songs, setSongs] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMusics(id as string);
      const album = data.slice(1);
      setAlbumInfo(data[0]);
      setLoading(true);
      setSongs(album as SongType[]);
    }

    fetchData();
  }, [id]);

  return (
    <div>
      <Carregando isLoading={ !loading }>
        <p data-testid="artist-name">{albumInfo?.artistName}</p>
        <p data-testid="album-name">{albumInfo?.collectionName}</p>
        {songs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            trackId={ song.trackId }
          />
        ))}
      </Carregando>
    </div>
  );
}

export default Album;
