import { React, useState } from 'react';
import styles from './index.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../../molecules/Input';
import Select from '../../molecules/Select';
import PhoneInput from '../../molecules/PhoneInput';
import AddressInput from '../../molecules/AddressInput';
import { userApi } from '../../../../../apis/usersApi';

const UserFormBox = ({ data, setAlert }) => {
  const [name, setName] = useState(data ? data.name : '');
  const [cpf, setCpf] = useState(data ? data.cpf : '');
  const [isActive, setIsActive] = useState(data ? data.isActive : true);
  const [gender, setGender] = useState(data ? data.gender : '');
  const [birthDate, setBirthDate] = useState(data ? data.birthDate : '');
    
  const [phones, setPhones] = useState(data ? data.phones : [{ id: Date.now(), type: "1", ddd: "", number: "" }]);
  const addPhone = () => setPhones([...phones, { id: Date.now(), type: "1", ddd: "", number: "" }]);
  const removePhone = (id) => { if (phones.length > 1) setPhones(phones.filter(phone => phone.id !== id)) };

  const [addresses, setAddresses] = useState(data ? data.addresses : [{ id: Date.now(), isDelivery: false, isBilling: false, streetType: "", street: "", number: "", neighborhood: "", cep: "", city: "", state: "", country: "" }]);
  const addAddress = () => setAddresses([...addresses, { id: Date.now(), isDelivery: false, isBilling: false, streetType: "", street: "", number: "", neighborhood: "", cep: "", city: "", state: "", country: "" }]);
  const removeAddress = (id) => { if (addresses.length > 1) setAddresses(addresses.filter(address => address.id !== id)) };

  const handleSave = async () => {
    try {
      const userObject = { name, cpf, isActive, gender, birthDate, phones, addresses };
      
      if(data) {
        const response = await userApi.editUser(data.id, userObject);
        setAlert({ status: response.status, message: response.message });
      }
      else {
        const response = await userApi.saveUser(userObject);
        setAlert({ status: response.status, message: response.message });
      }
    }
    
    catch (error) {
      setAlert({ status: 500, message: `Erro ao ${!data ? "salvar" : "editar"} usuário: ${error.message}` });
    }
  }

  return (
    <Form className={styles.userFormBox}>
      {!data && <>
        <Input id="nameInput" label="Nome completo" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <Input id="cpfInput" label="CPF" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} maxLenght="11"/>
        <Input id="isActiveInput" label="Usuário Ativo?" type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)}/>
        <Select id="genderInput" label="Gênero" options={[{value: 1, text: "Masculino"}, {value: 2, text: "Feminino"}, {value: 3, text: "Prefiro não informar"}]} value={gender} onChange={(e) => setGender(e.target.value)}/>
        <Input id="birthDateInput" label="Data de Nascimento" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
        <div className={styles.phonesDiv}>
          <h3>Telefones</h3>
          {phones.map(phone => (<PhoneInput key={phone.id} id={`phoneInput_${phone.id}`} removeFunction={() => removePhone(phone.id)} onChange={(field, value) => {
            setPhones(phones.map(p => p.id === phone.id ? { ...p, [field]: value } : p));
          }}/>))}
          <Button variant="outline-secondary" onClick={() => addPhone()}>Novo Telefone</Button>
        </div>
        <div className={styles.addressesDiv}>
          <h3>Endereços</h3>
          {addresses.map(address => (
            <AddressInput
              key={address.id}
              id={`addressInput${address.id}`}
              onChange={(field, value) => {
                setAddresses(addresses.map(a => a.id === address.id ? { ...a, [field]: value } : a));
              }}
              removeFunction={() => removeAddress(address.id)}
            />
          ))}
          <Button variant="outline-secondary" onClick={() => addAddress()}>Novo Endereço</Button>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
          <Button variant="secondary" href="../manageUser">Voltar</Button>
        </div>
      </>}

      {data && <>
        <Input id="nameInput" label="Nome completo" type="text" value={data.name} onChange={(e) => setName(e.target.value)}/>
        <Input id="cpfInput" label="CPF" type="text" value={data.cpf} onChange={(e) => setCpf(e.target.value)} disabled/>
        <Input id="isActiveInput" label="Usuário Ativo?" type="checkbox" checked={data.isActive} onChange={() => setIsActive(!isActive)}/>
        <Select id="genderInput" label="Gênero" options={[{value: 1, text: "Masculino"}, {value: 2, text: "Feminino"}, {value: 3, text: "Prefiro não informar"}]} value={data.gender} onChange={(e) => setGender(e.target.value)}/>
        <Input id="birthDateInput" label="Data de Nascimento" type="date" value={data.birthDate} onChange={(e) => setBirthDate(e.target.value)} disabled/>
        <div className={styles.phonesDiv}>
          <h3>Telefones</h3>
          {phones.map(phone => <PhoneInput key={phone.id} id={`phoneInput_${phone.id}`} selectValue={phone.type} dddValue={phone.ddd} inputValue={phone.number} removeFunction={() => removePhone(phone.id)} onChange={(field, value) => {
            setPhones(phones.map(p => p.id === phone.id ? { ...p, [field]: value } : p));
          }}/>)}
          <Button variant="outline-secondary" onClick={() => addPhone()}>Novo Telefone</Button>
        </div>
        <div className={styles.addressesDiv}>
          <h3>Endereços</h3>
          {addresses.map(address => (
            <AddressInput
              key={address.id}
              id={`addressInput${address.id}`}
              isBillingChecked={address.isBilling}
              isDeliveryChecked={address.isDelivery}
              streetType={address.streetType}
              street={address.street}
              number={address.number}
              neighborhood={address.neighborhood}
              cep={address.cep}
              country={address.country}
              state={address.state}
              city={address.city}
              onChange={(field, value) => {
                setAddresses(addresses.map(a => a.id === address.id ? { ...a, [field]: value } : a));
              }}
              removeFunction={() => removeAddress(address.id)}
            />
          ))}
          <Button variant="outline-secondary" onClick={() => addAddress()}>Novo Endereço</Button>
        </div>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" onClick={handleSave}>Salvar</Button>
          <Button variant="secondary" href="../manageUser">Voltar</Button>
        </div>
      </>}
    </Form>
  )
}

export default UserFormBox;