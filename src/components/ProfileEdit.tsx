import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';
import { UserType } from '../types';

function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setImage(userData.image);
        setDescription(userData.description);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (name && email && image && description) {
      const updatedUser: UserType = {
        ...user!,
        name,
        email,
        image,
        description,
      };

      await updateUser(updatedUser);
      navigate('/profile/edit');
    }
  };

  return (
    <div>
      <h1>Editar Perfil</h1>
      <Carregando isLoading={ loading }>
        <form>
          <label>
            Nome:
            <input
              type="text"
              value={ name }
              onChange={ (event) => setName(event.target.value) }
              data-testid="edit-input-name"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={ email }
              onChange={ (event) => setEmail(event.target.value) }
              data-testid="edit-input-email"
            />
          </label>
          <label>
            Imagem:
            <input
              type="text"
              value={ image }
              onChange={ (event) => setImage(event.target.value) }
              data-testid="edit-input-image"
            />
          </label>
          <label>
            Descrição:
            <textarea
              value={ description }
              onChange={ (event) => setDescription(event.target.value) }
              data-testid="edit-input-description"
            />
          </label>
          <button
            type="button"
            onClick={ handleSave }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      </Carregando>
    </div>
  );
}

export default ProfileEdit;
