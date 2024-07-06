import React from 'react';
import styles from './index.module.css';

import MenuItem from '../../molecules/MenuItem';
import CadastrarClientePng from '../../../../../images/home-admin/cadastrar-cliente.png';
import CadastrarProdutoPng from '../../../../../images/home-admin/cadastrar-produto.png';
import CadastrarCupomPng from '../../../../../images/home-admin/cadastrar-cupom.png';

const MenuBox = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuBox}>
        <MenuItem link="./userForm" image={CadastrarClientePng} text="Cadastrar Cliente"/>
        <MenuItem link="./productForm" image={CadastrarProdutoPng} text="Cadastrar Produto"/>
        <MenuItem link="./coupomForm" image={CadastrarCupomPng} text="Cadastrar Cupom"/>
      </ul>
    </div>
    
  )
}

export default MenuBox;