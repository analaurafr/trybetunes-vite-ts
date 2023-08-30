import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AlbumType, SongType } from '../types';

import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

function Album() {
  const [loadingCheck, setLoadingCheck] = useState(true);
  const [musicList, setMusicList] = useState<[AlbumType, ...SongType[]] | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchMusicList() {
      try {
        const fetchedMusicList = await getMusics(location.pathname.split('/')[2]);
        setMusicList(fetchedMusicList);
        setLoadingCheck(false);
      } catch (error) {
        console.error('Error fetching music list:', error);
        setLoadingCheck(false);
      }
    }

    if (musicList === null) {
      fetchMusicList();
    }
  }, [location.pathname, musicList]);

  return (
    <div>
      <Carregando isLoading={ loadingCheck }>
        {musicList && musicList.length > 0 ? (
          <>
            <h1 data-testid="artist-name">{musicList[0].artistName}</h1>
            <h2 data-testid="album-name">{musicList[0].collectionName}</h2>
            <div>
              {musicList.slice(1).map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                />
              ))}
            </div>
          </>
        ) : (
          <h2>Nenhum álbum foi encontrado</h2>
        )}
      </Carregando>
    </div>
  );
}

export default Album;
