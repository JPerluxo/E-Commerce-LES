import { React, useState } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Alert from '../../../../shared/components/molecules/Alert';
import CartBox from '../../organisms/CartBox';
import Footer from '../../../../shared/components/molecules/Footer';

const Cart = () => {
  const [alert, setAlert] = useState(null);
  const handleAlert = (alert) => setAlert(alert);

  return (<>
    <Header isUser/>
    <div className={styles.CartDiv}>
      {alert && <div className={styles.alertDiv}>
        <Alert status={alert.status} message={alert.message} onClose={() => setAlert(null)}/>
      </div>}
      <CartBox onAlert={handleAlert}/>
      <Footer/>
    </div>
  </>)
}

export default Cart;