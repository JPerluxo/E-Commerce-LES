import React from 'react';
import styles from './index.module.css';

const MenuItem = ({ link, image, text }) => {
  return (
    <li className={styles.menuItem}>
      <a href={link}>
        <img src={image} alt={`Imagem de: ${text}`}/>
        <h3>{text}</h3>
      </a>
    </li>
  )
}

export default MenuItem;