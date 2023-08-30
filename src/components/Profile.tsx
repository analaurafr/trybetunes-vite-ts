import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const user = await getUser();
      setIsLoading(false);
      setUserInfo(user);
    };
    getData();
  }, []);

  return (
    <div>
      {!isLoading && userInfo ? (
        <div>
          <p>
            {userInfo.name}
          </p>
          <img
            data-testid="profile-image"
            src={ userInfo.image }
            alt={ userInfo.name }
          />
          <Link to="/profile/edit">Editar perfil</Link>
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.description}</p>
        </div>
      ) : <p>Carregando...</p>}
    </div>
  );
}

export default Profile;
