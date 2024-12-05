import { React, useEffect, useState } from 'react';
import styles from './index.module.css';

import { userApi } from '../../../../../apis/usersApi';
import { useUserContext } from '../../../hooks/useUserContext';
import Tabs from '../../../../shared/components/molecules/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserFormBox from '../../../../shared/components/organisms/UserFormBox';

const ProfileBox = ({ onAlert }) => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('userTab');
  const { userId } = useUserContext();

  useEffect(() => {
    (async () => {
      if (userId) try {
        const response = await userApi.getUserById(userId);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          onAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
        }
      } catch (error) {
        onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
      }
    })();
  }, [onAlert, userId]);

  return (<div className={styles.ProfileBox}>
    <div className={styles.ProfileMenu}>
      <Tabs id="profileTabs" defaultActiveKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Tab eventKey="userTab" title="Dados do usuário">
          {userData && <UserFormBox data={userData} setAlert={onAlert} hiddenFields/>}
        </Tab>
        <Tab eventKey="purchases" title="Histórico de compras">
          
        </Tab>
      </Tabs>
    </div>
  </div>)
}

export default ProfileBox;