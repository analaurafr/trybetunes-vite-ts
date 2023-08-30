import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type MusicCardProps = {
  music: SongType;
  isFavorite: boolean;
  onFavoriteToggle: (trackId: number) => void;
};

function MusicCard({ music, isFavorite, onFavoriteToggle }: MusicCardProps) {
  const handleCheckboxChange = () => {
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
      <label
        htmlFor={ `checkbox-music-${music.trackId}` }
        onKeyDown={ (event) => {
          if (event.key === 'Enter') {
            handleCheckboxChange();
          }
        } }
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="checkbox"
        tabIndex={ 0 }
        aria-checked={ isFavorite }
        style={ { cursor: 'pointer' } }
        data-testid={ `checkbox-music-${music.trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${music.trackId}` }
          checked={ isFavorite }
          onChange={ handleCheckboxChange }
        />
        <img
          src={ isFavorite ? checkedHeart : emptyHeart }
          alt="favorite"
          style={ { width: '20px', height: '20px' } }
        />
      </label>
    </div>
  );
}

export default MusicCard;
