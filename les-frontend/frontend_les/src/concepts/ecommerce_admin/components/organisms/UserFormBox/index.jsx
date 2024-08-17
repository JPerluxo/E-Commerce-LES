import { React, useState } from 'react';
import styles from './index.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../../molecules/Input';
import Select from '../../molecules/Select';
import PhoneInput from '../../molecules/PhoneInput';

const UserFormBox = ({ data }) => {
  const genders = [{value: 1, text: "Masculino"}, {value: 2, text: "Feminino"}, {value: 3, text: "Prefiro não informar"}];
  
  const [phones, setPhones] = useState(data ? data.phones : [{ id: Date.now(), type: "1", ddd: "", number: "" }]);
  const addPhone = () => setPhones([...phones, { id: Date.now(), type: "1", ddd: "", number: "" }]);
  const removePhone = (id) => { if (phones.length > 1) setPhones(phones.filter(phone => phone.id !== id)) };
  
  return (
    <Form className={styles.userFormBox}>
      {!data && <>
        <Input id="nameInput" label="Nome completo" type="text"/>
        <Input id="cpfInput" label="CPF" type="text"/>
        <Input id="isActiveInput" label="Usuário Ativo?" type="checkbox"/>
        <Select id="genderInput" label="Gênero" options={genders}/>
        <Input id="birthDateInput" label="Data de Nascimento" type="date"/>
        <div className={styles.phonesDiv}>
          <h3>Telefones</h3>
          {phones.map(phone => (<PhoneInput key={phone.id} id="phonesInput" removeFunction={() => removePhone(phone.id)}/>))}
          <Button variant="outline-secondary" onClick={() => addPhone()}>Novo Telefone</Button>
        </div>
        <div className={styles.addressesDiv}>
          <h3>Endereços</h3>
        </div>
      </>}

      {data && <>
        <Input id="nameInput" label="Nome completo" type="text" value={data.name}/>
        <Input id="cpfInput" label="CPF" type="text" value={data.cpf} disabled/>
        <Input id="isActiveInput" label="Usuário Ativo?" type="checkbox" checked={data.isActive}/>
        <Select id="genderInput" label="Gênero" options={genders} value={data.gender}/>
        <Input id="birthDateInput" label="Data de Nascimento" type="date" value={data.birthDate} disabled/>
        <div className={styles.phonesDiv}>
          <h3>Telefones</h3>
          {phones.map(phone => <PhoneInput key={phone.id} id={`phoneInput_${phone.id}`} selectValue={phone.type} inputValue={`${phone.ddd + phone.number}`} removeFunction={() => removePhone(phone.id)}/>)}
          <Button variant="outline-secondary" onClick={() => addPhone()}>Novo Telefone</Button>
        </div>
        <div className={styles.addressesDiv}>
          <h3>Endereços</h3>
        </div>
      </>}
    </Form>
  )
}

export default UserFormBox;