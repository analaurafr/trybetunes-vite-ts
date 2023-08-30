import { Link } from 'react-router-dom';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type MusicCardProps = {
  music: SongType;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
};

function MusicCard({ music, isFavorite, onFavoriteToggle }: MusicCardProps) {
  const { trackId, trackName, previewUrl } = music;

  return (
    <div>
      <audio controls>
        <track kind="captions" />
        {' '}
        { }
        <source src={ previewUrl } type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Link to={ `/album/${trackId}` }>
        <p>{trackName}</p>
      </Link>
      <label
        htmlFor={
        `checkbox-music-${trackId}`
        }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          id={ `checkbox-music-${trackId}` }
          checked={ isFavorite }
          onChange={ onFavoriteToggle }
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
