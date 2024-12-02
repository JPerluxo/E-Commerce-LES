import React from 'react';
import styles from './index.module.css';

import MenuItem from '../../molecules/MenuItem';
import GerenciarClientePng from '../../../../../images/home-admin/gerenciar-cliente.png';
import GerenciarPedidoPng from '../../../../../images/home-admin/gerenciar-pedido.png';
import IndicadoresPng from '../../../../../images/home-admin/indicadores.png';

const MenuBox = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuBox}>
        <MenuItem link="./manageUser" image={GerenciarClientePng} text="Gerenciar Cliente"/>
        <MenuItem link="./managePurchase" image={GerenciarPedidoPng} text="Gerenciar Pedido"/>
        <MenuItem link="#" image={IndicadoresPng} text="Indicadores"/>
      </ul>
    </div>
    
  )
}

export default MenuBox;