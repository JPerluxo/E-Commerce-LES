import { React, useState } from 'react';
import styles from './index.module.css';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import useLocationOptions from '../../../hooks/useLocationOptions';

const AddressInput = ({ id, onChange, isDeliveryChecked, isBillingChecked, streetType, street, number, neighborhood, cep, country, state, city, removeFunction }) => {
  const { countries, getStatesByCountry, getCitiesByState } = useLocationOptions();
  const [selectedCountry, setSelectedCountry] = useState(country || '');
  const [selectedState, setSelectedState] = useState(state || '');
  const [selectedCity, setSelectedCity] = useState(city || '');
  const states = selectedCountry ? getStatesByCountry(selectedCountry) : [];
  const cities = selectedState ? getCitiesByState(selectedCountry, selectedState) : [];
  
  return (
    <div className={`mb-3 ${styles.addressInputDiv}`}>
      <div>
        <Form.Check inline label="Entrega" type="checkbox" defaultChecked={isDeliveryChecked} id={`isDeliveryCheckbox_${id}`} onChange={(e) => onChange('isDelivery', e.target.checked)}/>
        <Form.Check inline label="Cobrança" type="checkbox" defaultChecked={isBillingChecked} id={`isBillingCheckbox_${id}`} onChange={(e) => onChange('isBilling', e.target.checked)}/>
      </div>
      <Row className="g-2">
        <Col md>
          <FloatingLabel label="Tipo Logradouro">
            <Form.Control type="text" defaultValue={streetType} onChange={(e) => onChange('streetType', e.target.value)}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="Logradouro" className="mb-2">
            <Form.Control type="text" defaultValue={street} onChange={(e) => onChange('street', e.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <FloatingLabel label="Número">
            <Form.Control type="text" maxLength="4" defaultValue={number} onChange={(e) => onChange('number', e.target.value)}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="Bairro" className="mb-2">
            <Form.Control type="text" defaultValue={neighborhood} onChange={(e) => onChange('neighborhood', e.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <FloatingLabel label="CEP">
            <Form.Control type="text" maxLength="9" defaultValue={cep} onChange={(e) => onChange('cep', e.target.value)}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="País" className="mb-2">
            <Form.Select aria-label="Seletor de país" defaultValue={selectedCountry} onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState('');
              onChange('country', e.target.value);
            }}>
              <option>Selecione</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
      <Col md>
          <FloatingLabel label="Estado" className="mb-2">
            <Form.Select aria-label="Seletor de estado" defaultValue={selectedState} onChange={(e) => {setSelectedState(e.target.value); onChange('state', e.target.value);}} disabled={!selectedCountry}>
              <option>Selecione</option>
              {states.map((state) => (
                <option key={state.sigla} value={state.sigla}>{state.name}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel label="Cidade" className="mb-2">
            <Form.Select aria-label="Seletor de cidade" defaultValue={selectedCity} onChange={(e) => {setSelectedCity(e.target.value); onChange('city', e.target.value);}} disabled={!selectedState}>
              <option>Selecione</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Button variant="outline-danger" onClick={removeFunction}>Remover</Button>
    </div>
  )
}

export default AddressInput;