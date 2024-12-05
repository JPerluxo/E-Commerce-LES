import { api } from './configs/axiosConfig';
import { defineCancelApiObject } from './configs/axiosUtils';

export const purchaseApi = {
  getPurchasesTable: async function (cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/purchase/table`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  updatePurchaseStatus: async function ( purchaseObject, cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/purchase/updateStatus`,
      method: "POST",
      data: JSON.stringify(purchaseObject),
      headers: { 'Content-Type': 'application/json' },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })
  
    return response.data;
  },

  getUserPurchases: async function (userId, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/purchases/getByUserId?userId=${userId}`,
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })
    // return response.data;
    var response = { //resposta mockada para testes
      status: 200,
      data: {
        collumns: ["PRODUTO", "QUANTIDADE", "DATA", "VALOR", "STATUS DA COMPRA", "AÇÃO"],
        rows: [
          { id: 25, beverage: "Heineken", quantity: 5, purchaseDate: "2024-12-02", purchaseValue: "R$19.50", purchaseStatus: "Pagamento Realizado", hasBeenConsumed: true },
          { id: 26, beverage: "Heineken", quantity: 1, purchaseDate: "2024-12-02", purchaseValue: "R$3.90", purchaseStatus: "Pagamento Realizado", hasBeenConsumed: false },
        ]
      }
    }
    return response;
  },

  requestExchangeAndReturn: async function ( purchaseObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/purchase/exchangeAndReturn`,
    //   method: "POST",
    //   data: JSON.stringify(purchaseObject),
    //   headers: { 'Content-Type': 'application/json' },
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })
  
    // return response.data;

    var response = { //resposta mockada para testes
      data: {
        status: 200,
        message: "Troca solicitada com sucesso!"
      }
    }
    console.log(purchaseObject);
    return response.data;
  }
}

const cancelApiObject = defineCancelApiObject(purchaseApi)
