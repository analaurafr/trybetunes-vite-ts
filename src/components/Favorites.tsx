import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

export default function Favorites() {
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchFavoriteList() {
      setLoadingCheck(true);
      const allFavorites = await getFavoriteSongs();
      setFavoriteList(allFavorites);
      setLoadingCheck(false);
    }
    fetchFavoriteList();
  }, []);

  function handleCheckboxChange(trackId: number) {
    setFavoriteList((
      prevFavorites,
    ) => prevFavorites.filter((song) => song.trackId !== trackId));
  }

  return (
    <div>
      <Carregando isLoading={ loadingCheck }>
        {favoriteList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            onCheckboxChange={ () => handleCheckboxChange(music.trackId) }
          />
        ))}
      </Carregando>
    </div>
  );
}
