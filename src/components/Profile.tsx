import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import { UserType } from '../types';

function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Perfil</h1>
      <Carregando isLoading={ loading }>
        {user && user.name ? (
          <div>
            <p>
              Nome:
              {' '}
              {user.name}
            </p>
            <p>
              Email:
              {' '}
              {user.email}
            </p>
            <p>
              Imagem:
              {' '}
              {user.image}
            </p>
            <p>
              Descrição:
              {' '}
              {user.description}
            </p>
            <Link to="/profile/edit">Editar perfil</Link>
            {' '}
          </div>
        ) : (
          <p>Dados do perfil não encontrados.</p>
        )}
      </Carregando>
    </div>
  );
}

export default Profile;
