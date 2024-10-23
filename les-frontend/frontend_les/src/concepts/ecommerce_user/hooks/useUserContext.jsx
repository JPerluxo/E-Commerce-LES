import { createContext, useContext, useEffect, useState } from 'react';
import { userApi } from '../../../apis/usersApi';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUsersTable();
        if (response.status === 200 && response.data?.rows?.length > 0) {
          setUserId(response.data.rows[0].id);
        } else {
          console.error(`Erro: ${response.status} - ${response.message}`);
        }
      } catch (error) {
        console.error(`Erro: ${error.message}`);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};
