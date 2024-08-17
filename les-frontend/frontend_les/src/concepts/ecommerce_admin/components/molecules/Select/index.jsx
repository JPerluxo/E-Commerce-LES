import React from 'react';

import Form from 'react-bootstrap/Form';

const Select = ({ id, label, value, options, disabled = false }) => {
  return (
    <Form.Group className="mb-3" id={id}>
      <Form.Label htmlFor={`Select_${id}`}>{label}</Form.Label>
      <Form.Select id={`Select_${id}`} aria-label={label} defaultValue={value} disabled={disabled}>
        {options.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
      </Form.Select>
    </Form.Group>
  )
}

export default Select;