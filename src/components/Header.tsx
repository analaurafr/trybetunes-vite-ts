import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';

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
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <p data-testid="header-user-name">
          {userName ? `Olá, ${userName}!` : 'Usuário não encontrado'}
        </p>
      )}
    </header>
  );
}

export default Header;
