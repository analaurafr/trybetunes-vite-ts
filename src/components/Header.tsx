import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const user = await getUser();
        setUserName(user.name);
      } catch (error) {
        console.error('Erro ao buscar o nome do usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <Carregando isLoading={ loading }>
        {' '}
        {userName ? (
          <p data-testid="header-user-name">{`Olá, ${userName}!`}</p>
        ) : (
          <p data-testid="header-user-name">Usuário não encontrado</p>
        )}
      </Carregando>
    </header>
  );
}

export default Header;
