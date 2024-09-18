import React from 'react';
import styles from './index.module.css';

import { Carousel as BootstrapCarousel } from 'react-bootstrap';

import HomeSlide1 from '../../../../../images/home-carousel/HomeSlide1.jpg';
import HomeSlide2 from '../../../../../images/home-carousel/HomeSlide2.jpg';
import HomeSlide3 from '../../../../../images/home-carousel/HomeSlide3.jpg';

const Carousel = () => {
  const carouselInterval = 6000;

  return (
    <BootstrapCarousel className={styles.BootstrapCarousel}>
      <BootstrapCarousel.Item interval={carouselInterval}>
        <span className={styles.CarouselFrame}><img src={HomeSlide1} alt="Slide 1"/></span>
        <BootstrapCarousel.Caption className={styles.CarouselCaption}>
          <h3>Você sabia?</h3>
          <p>O vinho é uma das bebidas mais antigas do mundo. Ele foi produzido pela primeira vez há mais de 8.000 anos na região que hoje é a Geórgia, no leste da Europa.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item interval={carouselInterval}>
        <span className={styles.CarouselFrame}><img src={HomeSlide2} alt="Slide 2"/></span>
        <BootstrapCarousel.Caption className={styles.CarouselCaption}>
          <h3>Nunca beba em excesso!</h3>
          <p>A moderação é a chave para aproveitar uma boa bebida sem comprometer sua saúde ou segurança.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item interval={carouselInterval}>
        <span className={styles.CarouselFrame}><img src={HomeSlide3} alt="Slide 3"/></span>
        <BootstrapCarousel.Caption className={styles.CarouselCaption}>
          <h3>Atenção</h3>
          <p>Sempre use um copo adequado para a bebida que você está servindo. O tipo de copo pode realçar ou suavizar os sabores da bebida.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  )
}

export default Carousel;