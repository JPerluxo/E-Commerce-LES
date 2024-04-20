import React from 'react';

import Header from '../../organisms/Header';
import Carousel from '../../molecules/Carousel';
import ProductsBox from '../../organisms/ProductsBox';
import Footer from '../../molecules/Footer';

const Home = () => {
  return (<>
    <Header/>
    <Carousel/>
    <ProductsBox category="all"/>
    <Footer/>
  </>)
}

export default Home;
