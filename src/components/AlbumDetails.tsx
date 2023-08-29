import { AlbumType } from '../types';

type AlbumDetailsProps = {
  album: AlbumType;
};

function AlbumDetails({ album }: AlbumDetailsProps) {
  return (
    <div>
      <h1>Detalhes do Álbum</h1>
      <p>
        Nome do Álbum:
        {' '}
        {album.collectionName}
      </p>
      <p>
        Artista:
        {' '}
        {album.artistName}
      </p>
    </div>
  );
}

export default AlbumDetails;
