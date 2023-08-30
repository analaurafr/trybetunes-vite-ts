import { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

type MusicCardProps = {
  music: SongType;
  isFavorite: boolean;
  onFavoriteToggle: (trackId: number) => void;
};

function MusicCard({ music, isFavorite, onFavoriteToggle }: MusicCardProps) {
  const [isChecked, setIsChecked] = useState(isFavorite);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      await removeSong({
        trackId: music.trackId,
        trackName: music.trackName,
        previewUrl: music.previewUrl,
      });
    } else {
      await addSong({
        trackId: music.trackId,
        trackName: music.trackName,
        previewUrl: music.previewUrl,
      });
    }

    onFavoriteToggle(music.trackId);
  };

  return (
    <div>
      <p>{music.trackName}</p>
      <audio data-testid="audio-component" src="{previewUrl}" controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <div
        role="checkbox"
        onClick={ handleCheckboxChange }
        onKeyDown={ (event) => {
          if (event.key === 'Enter') {
            handleCheckboxChange();
          }
        } }
        tabIndex={ 0 }
        aria-checked={ isChecked }
        style={ { cursor: 'pointer' } }
        data-testid={ `checkbox-music-${music.trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${music.trackId}` }
          checked={ isChecked }
          onChange={ () => {} }
        />
        <img
          src={ isChecked ? checkedHeart : emptyHeart }
          alt="favorite"
          style={ { width: '20px', height: '20px' } }
        />
      </div>
    </div>
  );
}

export default MusicCard;
