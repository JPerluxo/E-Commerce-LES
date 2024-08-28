import { React, useState } from 'react';
import styles from './index.module.css';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CreditCardInput = ({ onChange, cardName, cardNum, cardDueDate, flag, cardCvv, removeFunction }) => {
  const [selectedFlag, setSelectedFlag] = useState(flag || '');
  const flags = [{id: 1, name: "VISA"}, {id: 2, name: "MasterCard"}, {id: 3, name: "American Express"}];

  return (
    <div className={`mb-3 ${styles.creditCardInputDiv}`}>
      <FloatingLabel label="Nome no Cartão" className="mb-2">
        <Form.Control type="text" defaultValue={cardName} onChange={(e) => onChange('cardName', e.target.value)}/>
      </FloatingLabel>
      <Row className="g-2">
        <Col md>
          <FloatingLabel label="Nº do Cartão">
            <Form.Control type="text" defaultValue={cardNum} maxLength="19" onChange={(e) => onChange('cardNum', e.target.value)}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="CVV" className="mb-2">
            <Form.Control type="text" defaultValue={cardCvv} maxLength="3" onChange={(e) => onChange('cardCvv', e.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <FloatingLabel label="Data de vencimento">
            <Form.Control type="month" defaultValue={cardDueDate} onChange={(e) => onChange('cardDueDate', e.target.value)}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="Bandeira" className="mb-2">
            <Form.Select aria-label="Seletor de bandeira" defaultValue={selectedFlag} onChange={(e) => {
              setSelectedFlag(e.target.value);
              onChange('flag', e.target.value);
            }}>
              <option>Selecione</option>
              {flags.map((flag) => (
                <option key={flag.id} value={flag.id}>{flag.name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Button variant="outline-danger" onClick={removeFunction}>Remover</Button>
    </div>
  )
}

export default CreditCardInput;