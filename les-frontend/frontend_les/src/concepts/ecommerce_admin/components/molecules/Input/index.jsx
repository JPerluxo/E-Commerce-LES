import React from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Input = ({ id, label, type,  placeholder, checked, onChange, maxLenght, value, disabled = false }) => {
  return (<>
    {type === 'checkbox' ? (
      <InputGroup className="mb-3" id={id}>
        <InputGroup.Text htmlFor={`Input_${id}`}>{label}</InputGroup.Text>
        <InputGroup.Checkbox
          aria-label={label}
          id={`Input_${id}`}
          defaultChecked={checked}
          onChange={onChange}
          defaultValue={value} 
          disabled={disabled}
        />
      </InputGroup>
    ) : (
      <Form.Group className="mb-3" id={id}>
        <Form.Label htmlFor={`Input_${id}`}>{label}</Form.Label>
        <Form.Control 
          type={type} 
          name={`Input_${id}`} 
          id={`Input_${id}`}
          placeholder={placeholder} 
          maxLength={maxLenght}
          defaultValue={value} 
          onChange={onChange}
          disabled={disabled} 
        />
      </Form.Group>
    )}
  </>)
}

export default Input;