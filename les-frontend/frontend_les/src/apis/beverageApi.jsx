import { api } from './configs/axiosConfig';
import { defineCancelApiObject } from './configs/axiosUtils';

export const beverageApi = {
  getBeverages: async function ( cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/beverage/all`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    });

    return response;
  },

  beverageToCart: async function ( cartObject, cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/beverage/toCart`,
      method: "POST",
      data: JSON.stringify(cartObject),
      headers: { 'Content-Type': 'application/json' },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getCartBeverages: async function ( userId, cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/beverage/getCart?userId=${userId}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  updateCartBeverageQuantity: async function ( beverageObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/beverage/updateCartQuantity`,
    //   method: "POST",
    //   data: JSON.stringify(beverageObject),
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      status: 200

      // resposta simulada de erro:
      // status: 500,
      // message: "Erro ao processar a compra!"
    }
  
    return response;
  },

  removeBeveragefromCart: async function ( beverageObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/beverage/removeFromCart`,
    //   method: "POST",
    //   data: JSON.stringify(beverageObject),
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      status: 200,
      message: "Produto removido do carrinho com sucesso!"
      // resposta simulada de erro:
      // status: 500,
      // message: "Erro ao processar a compra!"
    }
  
    return response;
  },

  checkoutBeverages: async function ( checkoutObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/beverage/checkout?checkoutObject=${checkoutObject}`,
    //   method: "POST",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      status: 200,
      message: "Compra processada com sucesso!"

      // resposta simulada de erro:
      // status: 500,
      // message: "Erro ao processar a compra!"
    }
    console.log(checkoutObject);

    return response;
  }
}

const cancelApiObject = defineCancelApiObject(beverageApi)
