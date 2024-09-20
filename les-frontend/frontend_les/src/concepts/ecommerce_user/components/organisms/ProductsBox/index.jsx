import { React, useState, useEffect } from 'react';
import styles from './index.module.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductCard from '../../molecules/ProductCard';
import { beverageApi } from '../../../../../apis/beverageApi';
import ProductsFilter from '../../molecules/ProductsFilter';

const ProductsBox = ({ onAlert }) => {
  const [products, setProducts] = useState([]);
  const [unfilteredProducts, setUnfilteredProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await beverageApi.getBeverages();
        if (response.status === 200) {
          setProducts(response.data);
          setUnfilteredProducts(response.data);
        } else {
          onAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
        }
      } catch (error) {
        onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
      }
    })();
  }, [onAlert]);

  return (
    <div className={styles.ProductsBox}>
      <ProductsFilter content={products} originalContent={unfilteredProducts} onFilter={setProducts}/>
      <Row xs={1} md={3} className={`g-4 ${styles.Row}`}>
        {products.map((product) => (
          <Col key={product.id} className={styles.Col}>
            <ProductCard product={product} onAlert={onAlert}/>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductsBox;
