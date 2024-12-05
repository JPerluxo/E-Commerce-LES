import React from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const PhoneInput = ({ id, onChange, selectValue, inputValue, dddValue, removeFunction, disabled = false }) => {
  return (
    <InputGroup className="mb-3" id={id}>
      <FloatingLabel label="Tipo">
        <Form.Select
          aria-label="Seletor de tipo de telefone"
          onChange={(e) => onChange('type', e.target.value)}
          id={`Select_${id}`}
          defaultValue={selectValue}
          disabled={disabled}
        >
          <option>Selecione</option>
          <option value="1">Celular</option>
          <option value="2">Fixo</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel  style={{maxWidth: "10vh"}} label="DDD">
        <Form.Control
          maxLength="2"
          aria-label="Campo de inserção de DDD de telefone"
          aria-describedby="inputDDD"
          onChange={(e) => onChange('ddd', e.target.value)}
          id={`InputDDD_${id}`}
          defaultValue={dddValue}
        />
      </FloatingLabel>
      <FloatingLabel label="Número">
        <Form.Control
          aria-label="Campo de inserção de número de telefone"
          maxLength="9"
          aria-describedby="inputTelefone"
          onChange={(e) => onChange('number', e.target.value)}
          id={`Input_${id}`}
          defaultValue={inputValue}
        />
      </FloatingLabel>
      <Button variant="outline-danger" onClick={removeFunction}>Remover</Button>
    </InputGroup>
  )
}

export default PhoneInput;