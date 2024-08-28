import React from 'react';
import styles from './index.module.css';

import MenuItem from '../../molecules/MenuItem';
import GerenciarClientePng from '../../../../../images/home-admin/gerenciar-cliente.png';
import GerenciarProdutoPng from '../../../../../images/home-admin/gerenciar-produto.png';
import GerenciarCupomPng from '../../../../../images/home-admin/gerenciar-cupom.png';
import IndicadoresPng from '../../../../../images/home-admin/indicadores.png';

const MenuBox = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuBox}>
        <MenuItem link="./manageUser" image={GerenciarClientePng} text="Gerenciar Cliente"/>
        <MenuItem link="./productForm" image={GerenciarProdutoPng} text="Gerenciar Produto"/>
        <MenuItem link="./coupomForm" image={GerenciarCupomPng} text="Gerenciar Cupom"/>
        <MenuItem link="#" image={IndicadoresPng} text="Indicadores"/>
      </ul>
    </div>
    
  )
}

export default MenuBox;