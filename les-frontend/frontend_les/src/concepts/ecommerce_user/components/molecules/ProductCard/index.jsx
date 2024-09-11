import { React, useRef } from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { beverageApi } from '../../../../../apis/beverageApi';

const ProductCard = ({ product, onAlert }) => {
  const inputRef = useRef(null);
  
  async function SendToCart() {
    try {
      const quantity = inputRef.current.value;
      
      if(quantity >= 1) {
        const cartObject = {
          beverageId: product.id,
          beverageQuantity: quantity,
          purchaseStatus: process.env.REACT_APP_IN_CART_STATUS,
          beverageValue: product.costPrice,
          clientId: "ID", // Ver como pegar ID do cliente
        }

        const response = await beverageApi.beverageToCart(cartObject);
        onAlert({ status: response.status, message: response.message });
      }
      else onAlert({status: 500, message: "Insira um valor válido!"});
    } catch (error) {
      onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
    }
  };

  return (
    <Card className={styles.Card}>
      <Card.Img src={product.imageUrl}/>
      <Card.Body className={styles.CardBody}>
        <Card.Title>{product.label}</Card.Title>
        <Card.Text>
          {Object.entries(product)
            .filter(([key]) => key !== 'imageUrl' && key !== 'groupId' && key !== 'id' && key !== 'costPrice' && key !== 'label')
            .map(([key, value]) => `${value}`)
            .join(', ')
          }
        </Card.Text>
        <InputGroup>
          <Form.Control placeholder="Quantidade" type="Number" min={1} ref={inputRef} aria-label="Quantidade" aria-describedby={`product_${product.id}`}/>
          <Button variant="primary" id={`product_${product.id}`} onClick={SendToCart}>R${product.costPrice}</Button>
        </InputGroup>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;