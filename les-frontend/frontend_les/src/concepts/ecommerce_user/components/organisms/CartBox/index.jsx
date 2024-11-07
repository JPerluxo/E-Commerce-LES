import { React, useEffect, useState } from 'react';
import styles from './index.module.css';

import Table from 'react-bootstrap/Table';
import { beverageApi } from '../../../../../apis/beverageApi';
import CartItem from '../../molecules/CartItem';
import CartPayment from '../../molecules/CartPayment';
import { useUserContext } from '../../../hooks/useUserContext';

const CartBox = ({ onAlert }) => {
  const [products, setProducts] = useState([]);
  const { userId } = useUserContext();

  const handleRemove = (beverageId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.beverageId !== beverageId));
  };

  const updateQuantity = (beverageId, newQuantity) => {
    setProducts(prevProducts => 
      prevProducts.map(product =>
        product.beverageId === beverageId ? { ...product, beverageQuantity: newQuantity } : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + (product.beverageValue * product.beverageQuantity), 0).toFixed(2);
  };

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const response = await beverageApi.getCartBeverages(userId);
          if (response.status === 200) {
            setProducts(response.data);
          } else {
            onAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
          }
        } catch (error) {
          onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
        }
      }
    })();
  }, [onAlert, userId]);

  return (<div className={styles.CartBox}>
    <div className={styles.CartTable}>
      <h1>Itens no carrinho</h1>
      <Table striped bordered>
        <tbody>
          {products.map(product => <tr key={`CartTr_${product.beverageId}`}><CartItem key={`CartItem_${product.beverageId}`} product={product} onRemove={handleRemove} onUpdateQuantity={updateQuantity}/></tr>)}
        </tbody>
      </Table>
      <p className={`fw-bold ${styles.CartTotal}`}>Total da compra: {`R$${calculateTotal()}`}</p>
    </div>
    <CartPayment onAlert={onAlert} products={products} userId={userId}/>
  </div>)
}

export default CartBox;