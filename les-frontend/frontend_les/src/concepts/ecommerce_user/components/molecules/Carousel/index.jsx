import React from 'react';
import styles from './index.module.css';

import { Carousel as BootstrapCarousel } from 'react-bootstrap';

import HomeSlide1 from '../../../../../images/home-carousel/HomeSlide1.jpg'
import HomeSlide2 from '../../../../../images/home-carousel/HomeSlide2.jpg'
import HomeSlide3 from '../../../../../images/home-carousel/HomeSlide3.jpg'

const Carousel = () => {
  return (
    <BootstrapCarousel className={styles.BootstrapCarousel}>
      <BootstrapCarousel.Item interval={10000}>
        <img src={HomeSlide1} alt="Slide 1"/>
        <BootstrapCarousel.Caption>
          <h3>Você sabia?</h3>
          <p>A leitura de todos os bons livros é uma conversação com as mais honestas pessoas dos séculos passados.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item interval={10000}>
        <img src={HomeSlide2} alt="Slide 2"/>
        <BootstrapCarousel.Caption>
          <h3>Sabedoria</h3>
          <p>A leitura desperta sentimentos profundos e nos revela novas formas de viver.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item interval={10000}>
        <img src={HomeSlide3} alt="Slide 3"/>
        <BootstrapCarousel.Caption>
          <h3>Leia</h3>
          <p>Ler é beber e comer. O espírito que não lê emagrece como o corpo que não come.</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  )
}

export default Carousel;