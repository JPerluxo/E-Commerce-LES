import { React, useEffect, useState } from 'react';
import styles from './index.module.css';

import { userApi } from '../../../../../apis/usersApi';
import { couponsApi } from '../../../../../apis/couponsApi';
import { beverageApi } from '../../../../../apis/beverageApi';
import Select from '../../../../shared/components/molecules/Select';
import { useUserContext } from '../../../hooks/useUserContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Input from '../../../../shared/components/molecules/Input';
import Button from 'react-bootstrap/Button';

const CartPayment = ({ onAlert, products }) => {
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [creditCards, setCreditCards] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [selectedCreditCards, setSelectedCreditCards] = useState([]);
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const { userId } = useUserContext();

  const formatAdresses = (adressesList) => {
    return adressesList.map(({ id, street, number, neighborhood, city, state, country }) => ({
      value: id,
      text: `${street} Nº${number}, ${neighborhood}, ${city} - ${state}, ${country}`,
    }));
  };

  const formatCreditCard = (creditCard) => {
    const censoredNumber = creditCard.number.slice(0, -4).replace(/\d/g, '*') + creditCard.number.slice(-4);
    return `${creditCard.name} [Nº ${censoredNumber}] [Vencimento: ${new Date(creditCard.dueDate).toLocaleDateString()}]`;
  };

  const formatCoupon = (coupon) => {
    return `${coupon.code} - ${coupon.type} no valor de R$${coupon.value}`;
  };

  const checkout = async () => {
    const checkoutObject = {
      "products": products.map(({ beverageId, beverageQuantity, beverageValue }) => {
        return {
          "beverageId": beverageId,
          "beverageQuantity": beverageQuantity,
          "checkoutDate": Date.now(),
          "checkoutStatus": process.env.REACT_APP_IN_PAYMENT_MADE_STATUS,
          "checkoutValue": (beverageValue * beverageQuantity).toFixed(2),
          "userId": userId,
          "deliveryAddress": selectedDeliveryAddress,
          "BillingAddress": selectedBillingAddress
        };
      }),
      "paymentMethods": {
        creditCards: selectedCreditCards,
        coupons: selectedCoupons,
      }
    }

    const response = await beverageApi.checkoutBeverages(checkoutObject);
    onAlert({ status: response.status, message: response.message });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleCreditCardChange = (id) => {
    setSelectedCreditCards(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const handleCouponChange = (id) => {
    setSelectedCoupons(prev => 
      prev.includes(id) ? prev.filter(couponId => couponId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const response = await userApi.getUserById(userId);
          if (response.status === 200) {
            setDeliveryAddresses(formatAdresses(response.data?.addresses?.filter(address => address.isDelivery === true)));
            setBillingAddresses(formatAdresses(response.data?.addresses?.filter(address => address.isBilling === true)));
            setCreditCards(response.data?.creditCards?.filter(creditCard => creditCard.isActive === true));
          } else {
            onAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
          }
        } catch (error) {
          onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
        }

        try {
          const response = await couponsApi.getCouponsByUserId(userId);
          if (response.status === 200) {
            setCoupons(response.data?.filter(coupon => coupon.hasBeenUsed === false));
          } else {
            onAlert({status: response.status, message: `Erro: ${response.status} - ${response.message}`});
          }
        } catch (error) {
          onAlert({status: 500, message: error?.response?.data?.message ?? `Erro: ${error.message}`});
        }
      }
    })();
  }, [onAlert, userId]);

  return (<div className={styles.CartPayment}>
    <h1>Informaçãoes da Compra</h1>
    <Select id="CartDeliveryAddressSelect" label="Endereço de Entrega" options={deliveryAddresses} onChange={(e) => setSelectedDeliveryAddress(e.target.value)}/>
    <Select id="CartBillingAddressSelect" label="Endereço de Cobrança" options={billingAddresses} onChange={(e) => setSelectedBillingAddress(e.target.value)}/>
    <p className="mb-2">Métodos de pagamento</p>
    <Tabs defaultActiveKey="creditCards" fill transition={false}>
      <Tab eventKey="creditCards" title="Cartões de Crédito" className={styles.CartPaymentMethodSelect}>
        {creditCards.map(creditCard => <Input key={`creditCardSelect_${creditCard.id}`} id={`creditCardSelect_${creditCard.id}`} type="checkbox" value={creditCard.id} label={formatCreditCard(creditCard)} onChange={() => handleCreditCardChange(creditCard.id)}/>)}
      </Tab>
      <Tab eventKey="coupons" title="Cupons" className={`${styles.CartPaymentMethodSelect} ${styles.couponsMethod}`}>
        {coupons.map(coupon => <Input key={`couponSelect_${coupon.id}`} id={`couponSelect_${coupon.id}`} type="checkbox" value={coupon.id} label={formatCoupon(coupon)} onChange={() => handleCouponChange(coupon.id)}/>)}
      </Tab>
    </Tabs>
    <Button variant="primary" onClick={checkout}>Finalizar Compra</Button>
  </div>)
}

export default CartPayment;