import { React, useState } from 'react';
import styles from './index.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from '../../molecules/Input';
import Select from '../../molecules/Select';
import PhoneInput from '../../molecules/PhoneInput';
import AddressInput from '../../molecules/AddressInput';
import CreditCardInput from '../../molecules/CreditCardInput';
import { userApi } from '../../../../../apis/usersApi';

const UserFormBox = ({ data, setAlert }) => {
  const [name, setName] = useState(data ? data.name : '');
  const [cpf, setCpf] = useState(data ? data.cpf : '');
  const [isActive, setIsActive] = useState(data ? data.isActive : true);
  const [gender, setGender] = useState(data ? data.gender : '');
  const [birthDate, setBirthDate] = useState(data ? data.birthDate : '');
  const [password, setPassword] = useState(data ? data.password : '');
    
  const [phones, setPhones] = useState(data ? data.phones : [{ id: Date.now(), type: "1", ddd: "", number: "" }]);
  const addPhone = () => setPhones([...phones, { id: Date.now(), type: "", ddd: "", number: "" }]);
  const removePhone = (id) => { if (phones.length > 1) setPhones(phones.filter(phone => phone.id !== id)) };

  const [addresses, setAddresses] = useState(data ? data.addresses : [{ id: Date.now(), isDelivery: false, isBilling: false, streetType: "", street: "", number: "", neighborhood: "", cep: "", city: "", state: "", country: "" }]);
  const addAddress = () => setAddresses([...addresses, { id: Date.now(), isDelivery: false, isBilling: false, streetType: "", street: "", number: "", neighborhood: "", cep: "", city: "", state: "", country: "" }]);
  const removeAddress = (id) => { if (addresses.length > 1) setAddresses(addresses.filter(address => address.id !== id)) };

  const [creditCards, setCreditCards] = useState(data ? data.creditCards : [{ id: Date.now(), isActive: true, name: "", number: "", dueDate: "", flag: "", cvv: "" }]);
  const addCreditCard = () => setCreditCards([...creditCards, { id: Date.now(), isActive: true, name: "", number: "", dueDate: "", flag: "", cvv: "" }]);
  const removeCreditCard = (id) => { if (creditCards.length > 1) setCreditCards(creditCards.filter(creditCard => creditCard.id !== id)) };

  const handleSave = async () => {
    const removeId = (items) => items.map(({ id, ...rest }) => rest);
    try {
      const userObject = { name, cpf, isActive, gender, birthDate, password, phones, addresses, creditCards };
      
      if(data) {
        const response = await userApi.updateUser(data.id, userObject);
        setAlert({ status: response.status, message: response.message });
      }
      else {
        const response = await userApi.saveUser({ ...userObject, phones: removeId(phones), addresses: removeId(addresses), creditCards: removeId(creditCards) });
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
        <Input id="passwordInput" label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

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

        <div className={styles.creditCardsDiv}>
          <h3>Cartões de Crédito</h3>
          {creditCards.map(creditCard => (
            <CreditCardInput
              key={creditCard.id}
              id={`creditCardInput_${creditCard.id}`}
              onChange={(field, value) => {
                setCreditCards(creditCards.map(c => c.id === creditCard.id ? { ...c, [field]: value } : c));
              }}
              removeFunction={() => removeCreditCard(creditCard.id)}
            />
          ))}
          <Button variant="outline-secondary" onClick={() => addCreditCard()}>Novo Cartão</Button>
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
        <Input id="passwordInput" label="Senha" type="password" value={data.password} onChange={(e) => setPassword(e.target.value)}/>

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

        <div className={styles.creditCardsDiv}>
          <h3>Cartões de Crédito</h3>
          {creditCards.map(creditCard => (
            <CreditCardInput
              key={creditCard.id}
              id={`creditCardInput_${creditCard.id}`}
              isActiveChecked={creditCard.isActive}
              cardName={creditCard.name}
              cardNum={creditCard.number}
              cardCvv={creditCard.cvv}
              cardDueDate={creditCard.dueDate}
              flag={creditCard.flag}
              removeFunction={() => removeCreditCard(creditCard.id)}
              onChange={(field, value) => {
                setCreditCards(creditCards.map(c => c.id === creditCard.id ? { ...c, [field]: value } : c));
              }}
            />
          ))}
          <Button variant="outline-secondary" onClick={() => addCreditCard()}>Novo Cartão</Button>
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