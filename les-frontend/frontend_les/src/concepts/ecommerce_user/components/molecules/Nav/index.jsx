import { React, useState } from 'react';
import styles from './index.module.css';

import { Nav as BootstrapNav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { LuShoppingBag } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { categoryApi } from '../../../../../apis/categoryApi';

const Nav = () => {
  const [categories, setCategories] = useState(null)
  categoryApi.getCategories().then(data => {
    setCategories(data);
  });

  return (
    <BootstrapNav>
      <Dropdown as={BootstrapNav.Item}>
        <Dropdown.Toggle as={BootstrapNav.Link} className={styles.NavLink}>Categorias</Dropdown.Toggle>
        <Dropdown.Menu data-bs-theme="light" className={styles.DropdownMenu}>
          {categories ? categories.map(cat => (
            <Dropdown.Item key={cat.id} href={`./category?id=${cat.id}`}>{cat.description}</Dropdown.Item>
          )) : null}
        </Dropdown.Menu>
      </Dropdown>
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
