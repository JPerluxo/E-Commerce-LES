import { React, useState, useEffect } from 'react';
import styles from './index.module.css';

import Header from '../../../../shared/components/organisms/Header';
import Footer from '../../../../shared/components/molecules/Footer';
import TableBox from '../../organisms/TableBox';
import Alert from '../../../../shared/components/molecules/Alert';
import { purchaseApi } from '../../../../../apis/purchaseApi';

const ManagePurchase = () => {
    const [purchases, setPurchases] = useState(null);
    const [alert, setAlert] = useState(null);
    const handleAlert = (alert) => setAlert(alert);

    useEffect(() => {
      (async () => {
        try {
          const response = await purchaseApi.getPurchasesTable();
          if (response.status === 200) {
            setPurchases(response.data);
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
      {purchases && (<TableBox content={purchases} onAlert={handleAlert} tableType="purchases" filterProperty="beverage"/>)}
    </div>
    <Footer/>
  </>)
}

export default ManagePurchase;