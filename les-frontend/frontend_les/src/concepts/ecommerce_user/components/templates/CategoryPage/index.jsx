import { React, useState, useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import styles from './index.module.css';

import Header from '../../organisms/Header';
import ProductsBox from '../../organisms/ProductsBox';
import Footer from '../../molecules/Footer';
import { categoryApi } from '../../../../../apis/categoryApi';

const CategoryPage = () => {
  const urlId = new URLSearchParams(useLocation().search).get('id');
  const [category, setCategory] = useState(null);
  useEffect(() => {
    categoryApi.getCategories().then(data => {
      setCategory(data.find(cat => cat.id === parseInt(urlId)));
    });
  },[urlId]);


  return (<>
    <Header/>
    <h1 className={styles.h1}>{category ? category.description : null}</h1>
    <ProductsBox category={category ? category.id : null}/>
    <Footer/>
  </>)
}

export default CategoryPage;
