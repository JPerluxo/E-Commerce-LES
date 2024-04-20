import React from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product }) => {
  return (
    <Card className={styles.Card}>
      <Card.Img src={product.imageUrl}/>
      <Card.Body className={styles.CardBody}>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.text}
        </Card.Text>
        <Button variant="primary" href={`./book?id=${product.id}`}>R${product.price}</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;