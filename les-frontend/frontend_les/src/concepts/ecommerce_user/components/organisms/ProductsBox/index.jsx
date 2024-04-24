import { React, useState } from 'react';
import styles from './index.module.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductCard from '../../molecules/ProductCard';
import { bookApi } from '../../../../../apis/bookApi';

const ProductsBox = ( {category} ) => {
  const [products, setProducts] = useState([]);
  bookApi.getBooksByCategory(category).then(data => { setProducts(data); });

  return (
    <Row xs={1} md={3} className={`g-4 ${styles.Row}`}>
      {products.map((product) => (
        <Col key={product.id} className={styles.Col}>
          <ProductCard product={product}/>
        </Col>
      ))}
    </Row>
  )
}

export default ProductsBox;
