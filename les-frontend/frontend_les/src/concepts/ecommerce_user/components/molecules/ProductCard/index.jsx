import { React, useRef } from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
          clientId: 1,
        }

        const response = await beverageApi.beverageToCart(cartObject);
        onAlert({ status: response.status, message: response.message });
      }
      else onAlert({status: 500, message: "Insira um valor válido!"});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Card className={styles.Card}>
      <Card.Img src={product.imageUrl}/>
      <Card.Body className={styles.CardBody}>
        <Card.Title>{product.label}</Card.Title>
        <Card.Text as="div" className={styles.CardDiv}>
          <div className={styles.CardYear}><p className="fw-bold">Ano</p><p>{product.year}</p></div>
          <div className={styles.CardManufacturer}><p className="fw-bold">Fabricante</p><p>{product.manufacturer}</p></div>
          <div className={styles.CardCountry}><p className="fw-bold">País</p><p>{product.country}</p></div>
          <div className={styles.CardAlcoholContent}><p className="fw-bold">Teor Alcoólico</p><p>{product.alcoholContent}%</p></div>
          <div className={styles.CardVolume}><p className="fw-bold">Volume</p><p>{(product.volume * 1000).toFixed(0)}mL</p></div>
          <div className={styles.CardPrice}><p className="fw-bold">Preço unit.</p><p>R${product.costPrice.toFixed(2)}</p></div>
        </Card.Text>
        <Form.Control placeholder="Quantidade" type="Number" min={1} ref={inputRef} aria-label="Quantidade" aria-describedby={`product_${product.id}`}/>
        <Button variant="primary" className={styles.BuyButton} id={`product_${product.id}`} onClick={SendToCart}>Adicionar ao carrinho</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;