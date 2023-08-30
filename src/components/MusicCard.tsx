import { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [isFavorited, setIsFavorited] = useState(false);
  const song = {
    trackId,
    trackName,
    previewUrl,
  };

  function handleClick() {
    setIsFavorited(!isFavorited);
    if (isFavorited) {
      removeSong(song);
    } else {
      addSong(song);
    }
  }

  function showImage() {
    if (isFavorited) {
      return (
        <img
          src={ checkedHeart }
          alt="favorite"
        />
      );
    }
    return (
      <img
        src={ emptyHeart }
        alt="favorite"
      />
    );
  }

  return (
    <div>
      <p key={ trackId }>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>

      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          checked={ isFavorited }
          onChange={ handleClick }
        />
        <div>
          {showImage()}
        </div>
      </label>
    </div>
  );
}

export default MusicCard;
