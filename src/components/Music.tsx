import { SongType } from '../types';

function Music({ trackName }: SongType) {
  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src="{previewUrl}" controls>
        <track kind="captions" />
        Seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
    </div>
  );
}

export default Music;
