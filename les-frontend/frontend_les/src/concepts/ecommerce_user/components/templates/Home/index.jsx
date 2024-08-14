import React from 'react';

import Header from '../../../../shared/components/organisms/Header';
import Carousel from '../../molecules/Carousel';
import ProductsBox from '../../organisms/ProductsBox';
import Footer from '../../../../shared/components/molecules/Footer';

const Home = () => {
  return (<>
    <Header isUser/>
    <Carousel/>
    <ProductsBox/>
    <Footer/>
  </>)
}

export default Home;
