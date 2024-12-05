import { React, useState } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Alert from '../../../../shared/components/molecules/Alert';
import ProfileBox from '../../organisms/ProfileBox';
import Footer from '../../../../shared/components/molecules/Footer';

const Profile = () => {
  const [alert, setAlert] = useState(null);
  const handleAlert = (alert) => setAlert(alert);

  return (<>
    <Header isUser/>
    <div className={styles.profileDiv}>
      {alert && <div className={styles.alertDiv}>
        <Alert status={alert.status} message={alert.message} onClose={() => setAlert(null)}/>
      </div>}
      <ProfileBox onAlert={handleAlert}/>
      <Footer/>
    </div>
  </>)
}

export default Profile;