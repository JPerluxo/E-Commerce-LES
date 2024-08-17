import React from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const PhoneInput = ({ id, selectOnChange, selectValue, inputOnChange, inputValue, removeFunction, disabled = false }) => {
  return (
    <InputGroup className="mb-3" id={id}>
      <Form.Select
        aria-label="Seletor de tipo de telefone"
        onChange={selectOnChange}
        id={`Select_${id}`}
        defaultValue={selectValue}
        disabled={disabled}
      >
        <option value="1">Celular</option>
        <option value="2">Fixo</option>
      </Form.Select>
      <Form.Control
        aria-label="Campo de inserção de número de telefone"
        aria-describedby="inputTelefone"
        onChange={inputOnChange}
        id={`Input_${id}`}
        defaultValue={inputValue}
      />
      <Button variant="outline-danger" onClick={removeFunction}>Remover</Button>
    </InputGroup>
  )
}

export default PhoneInput;