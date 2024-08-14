import { React, useRef } from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { bookApi } from '../../../../../apis/bookApi';

const ProductCard = ({ product, onAlert }) => {
  const inputRef = useRef(null);
  
  async function SendToCart() {
    try {
      const quantity = inputRef.current.value;
      
      if(quantity >= 1) {
        const cartObject = {
          bookId: product.id,
          bookQuantity: quantity,
          purchaseStatus: process.env.REACT_APP_IN_CART_STATUS,
          bookValue: product.price,
          clientId: "ID", // Ver como pegar ID do cliente
        }

        const response = await bookApi.bookToCart(cartObject);
        onAlert({ status: response.status, message: response.message });
      }
      else onAlert({status: 500, message: "Insira um valor válido!"});
    } catch (error) {
      onAlert({status: 500, message: `Erro: ${error.message}`});
    }
  };

  return (
    <Card className={styles.Card}>
      <Card.Img src={product.imageUrl}/>
      <Card.Body className={styles.CardBody}>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.text}
        </Card.Text>
        <InputGroup>
          <Form.Control placeholder="Quantidade" type="Number" min={1} ref={inputRef} aria-label="Quantidade" aria-describedby={`product_${product.id}`}/>
          <Button variant="primary" id={`product_${product.id}`} onClick={SendToCart}>R${product.price}</Button>
        </InputGroup>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;