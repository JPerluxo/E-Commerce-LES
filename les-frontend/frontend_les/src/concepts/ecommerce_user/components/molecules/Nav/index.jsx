import React from 'react';
import styles from './index.module.css';

import { Nav as BootstrapNav } from 'react-bootstrap';
import { LuShoppingBag } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

const Nav = () => {
  return (
    <BootstrapNav>
      <BootstrapNav.Item>
        <BootstrapNav.Link href="./cart" className={styles.NavLink}> <LuShoppingBag/> Carrinho </BootstrapNav.Link>
      </BootstrapNav.Item>
      <BootstrapNav.Item>
        <BootstrapNav.Link href="./profile" className={styles.NavLink}> <CgProfile/> Perfil </BootstrapNav.Link>
      </BootstrapNav.Item>
    </BootstrapNav>
  )
}

export default Nav;
