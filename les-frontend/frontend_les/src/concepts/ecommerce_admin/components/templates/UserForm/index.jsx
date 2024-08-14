import { React, useState, useEffect } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Footer from '../../../../shared/components/molecules/Footer';
import TableBox from '../../organisms/TableBox';
import Alert from 'react-bootstrap/Alert';
import { userApi } from '../../../../../apis/usersApi';

const UserForm = () => {
  const [users, setUsers] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUsers();
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
        }
      } catch (err) {
        setAlert({status: 500, message: `Erro: ${err.message}`});
      }
    })();
  }, []);

  return (<>
    <Header/>
    <div className={styles.tableBox}>
      {alert && <Alert variant={alert.status === 200 ? "success" : "danger"}>
        {alert.message}
      </Alert>}
      {users && (<TableBox content={users}/>)}
    </div>
    <Footer/>
  </>)
}

export default UserForm;