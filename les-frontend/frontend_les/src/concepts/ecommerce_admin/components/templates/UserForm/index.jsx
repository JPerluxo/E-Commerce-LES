import { React, useState, useEffect} from 'react';
import styles from './index.module.css';

import Alert from '../../../../shared/components/molecules/Alert';
import UserFormBox from '../../organisms/UserFormBox';
import Footer from '../../../../shared/components/molecules/Footer';
import { userApi } from '../../../../../apis/usersApi';
import { useLocation } from 'react-router-dom';

const UserForm = ({ newForm = false }) => {
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!newForm) (async () => {
      try {
        const userId = new URLSearchParams(location.search).get('id');
        const response = await userApi.getUserById(userId);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          setAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
        }
      } catch (error) {
        setAlert({status: 500, message: `Erro: ${error.message}`});
      }
    })();
  }, [newForm, location.search]);

  return (<>
    <div className={styles.formBox}>
      {alert && <Alert status={alert.status} message={alert.message} onClose={() => setAlert(null)}/>}

      {/*Novo Registro*/}
      {newForm && <>
        <h1>Novo Usuário</h1>
        <UserFormBox setAlert={setAlert}/>
      </>}

      {/*Registro Existente*/}
      {!newForm && userData && <>
        <h1>Editar Usuário</h1>
        <UserFormBox data={userData} setAlert={setAlert}/>
      </>}

    </div>
    <Footer/>
  </>)
}

export default UserForm;