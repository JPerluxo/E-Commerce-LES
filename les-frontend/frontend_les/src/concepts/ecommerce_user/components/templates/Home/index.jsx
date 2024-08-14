import { React, useState } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Carousel from '../../molecules/Carousel';
import Alert from 'react-bootstrap/Alert';
import ProductsBox from '../../organisms/ProductsBox';
import Footer from '../../../../shared/components/molecules/Footer';

const Home = () => {
  const [alert, setAlert] = useState(null);
  const handleAlert = (alert) => setAlert(alert);

  return (<>
    <Header isUser/>
    <Carousel/>
    {alert && <div className={styles.alertDiv}>
      <Alert variant={alert.status === 200 ? "success" : "danger"}>
        {alert.message}
      </Alert>
    </div>}
    <ProductsBox onAlert={handleAlert}/>
    <Footer/>
  </>)
}

export default Home;
