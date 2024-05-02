import React from 'react';
import styles from './index.module.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logo from '../../../../../images/Logo.png';
import Nav from '../../molecules/Nav';

const Header = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" fixed="top" className={styles.Navbar}>
      <Container className={styles.Container}>
        <Navbar.Brand href="./home" className={styles.NavBrand}>
          <img src={Logo} alt="E-Commerce logo"/>
        </Navbar.Brand>
        <Nav/>
      </Container>
    </Navbar>
  )
}

export default Header;
