import { React, useState } from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';

const CartItem = ({ product, onRemove, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(product.beverageQuantity);
  const [showPopup, setShowPopup] = useState(false);

  const handleMinusClick = () => {
    if (quantity === 1) {
      setShowPopup(true);
    } else {
      setQuantity(quantity - 1);
      onUpdateQuantity(product.beverageId, quantity - 1);
    }
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
    onUpdateQuantity(product.beverageId, quantity + 1);
  };

  const handleRemove = () => {
    onRemove(product.beverageId);
    setShowPopup(false);
  };

  return (<>
    <td className={styles.CartItem}>
      <img src={product.imageUrl} alt={`CartProduct_${product.beverageId}`}/>
      <div className={styles.ItemDiv}>
        <div className={styles.ItemYear}><p className="fw-bold">Ano</p><p>{product.beverageYear}</p></div>
        <div className={styles.ItemManuLabel}><p className="fw-bold">Produto</p><p>{product.beverageLabel}</p></div>
        <div className={styles.ItemCountry}><p className="fw-bold">País</p><p>{product.beverageCountry}</p></div>
        <div className={styles.ItemAlcoholContent}><p className="fw-bold">Teor Alcoólico</p><p>{product.beverageAlcoholContent}%</p></div>
        <div className={styles.ItemVolume}><p className="fw-bold">Volume</p><p>{(product.beverageVolume * 1000).toFixed(0)}mL</p></div>
        <InputGroup className={styles.ItemQuantity}>
          <Button variant="outline-secondary" id={`Product_${product.beverageId}_minusQuantity`} onClick={handleMinusClick} title="Quantidade"><FaMinus/></Button>
          <InputGroup.Text  className={styles.ItemQuantityNum} id={`Product_${product.beverageId}_quantityText`} title="Quantidade">{quantity}</InputGroup.Text>
          <Button variant="outline-secondary" id={`Product_${product.beverageId}_plusQuantity`} onClick={handlePlusClick} title="Quantidade"><FaPlus/></Button>
        </InputGroup>
      </div>
      <div className={styles.ItemPrice}><p className="fw-bold">Valor</p><p>{`R$${(product.beverageValue * quantity).toFixed(2)}`}</p></div>
    </td>

    <Modal show={showPopup} onHide={() => setShowPopup(false)} className={styles.Modal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Remoção</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você deseja remover este produto do carrinho?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleRemove}>Sim</Button>
        <Button variant="secondary" onClick={() => setShowPopup(false)}>Não</Button>
      </Modal.Footer>
    </Modal>
  </>)
}

export default CartItem;