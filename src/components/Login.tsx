import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: { target: { value: any; }; }) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleClick = async () => {
    if (name.length >= 3) {
      setLoading(true);
      try {
        await createUser({ name });
        setLoading(false);
        navigate('/search');
      } catch (error) {
        console.error('Erro ao salvar o nome:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>
        Nome:
        <input
          type="text"
          value={ name }
          onChange={ handleNameChange }
          data-testid="login-name-input"
          disabled={ loading }
        />
      </label>
      <Link to="/">
        <button
          onClick={ handleClick }
          data-testid="login-submit-button"
          disabled={ name.length < 3 || loading }
        >
          <Carregando isLoading={ loading }>Entrar</Carregando>
        </button>
      </Link>
    </div>
  );
}

export default Login;
