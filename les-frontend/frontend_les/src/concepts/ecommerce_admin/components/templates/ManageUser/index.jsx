import { React, useState, useEffect } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Footer from '../../../../shared/components/molecules/Footer';
import TableBox from '../../../../shared/components/organisms/TableBox';
import Alert from '../../../../shared/components/molecules/Alert';
import { userApi } from '../../../../../apis/usersApi';

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [alert, setAlert] = useState(null);
  const handleAlert = (alert) => setAlert(alert);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.getUsersTable();
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
        }
      } catch (error) {
        setAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
      }
    })();
  }, [setAlert]);

  return (<>
    <Header/>
    <div className={styles.tableBox}>
      {alert && <Alert status={alert.status} message={alert.message} onClose={() => setAlert(null)}/>}
      {users && (<TableBox content={users} onAlert={handleAlert} deleteFunction={userApi.deleteUser} filterProperty="name"/>)}
    </div>
    <Footer/>
  </>)
}

export default ManageUser;