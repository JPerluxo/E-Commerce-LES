// import { api } from './configs/axiosConfig';
// import { defineCancelApiObject } from './configs/axiosUtils';

export const purchaseApi = {
  getPurchasesTable: async function (cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/purchases/table`,
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    // return response.data;

    var response = { //resposta mockada para testes
      status: 200,
      data: {
        collumns: ["ID", "PRODUTO", "QUANTIDADE", "DATA", "VALOR", "CLIENTE", "STATUS DA COMPRA"],
        rows: [
          { id: 25, beverage: "Heineken", quantity: 5, purchaseDate: "2024-12-02", purchaseValue: 19.50, purchaseStatus: 2, userName: "Jefferson Perluxo Clemente" },
          { id: 26, beverage: "Heineken", quantity: 1, purchaseDate: "2024-12-02", purchaseValue: 3.90, purchaseStatus: 2, userName: "Jefferson Perluxo Clemente" },
        ]
      }
    }

    return response;
  },

  updatePurchaseStatus: async function ( purchaseObject, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/purchase/updatePurchaseStatus`,
    //   method: "POST",
    //   data: JSON.stringify(purchaseObject),
    //   headers: { 'Content-Type': 'application/json' },
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })
  
    // return response.data;

    var response = { //resposta mockada para testes
      data: {
        status: 200,
        message: "Status da compra alterado com sucesso!"
      }
    }
    console.log(purchaseObject);
    return response.data;
  }
}

// const cancelApiObject = defineCancelApiObject(purchaseApi)
