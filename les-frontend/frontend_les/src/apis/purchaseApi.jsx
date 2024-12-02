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
  }
}

const cancelApiObject = defineCancelApiObject(purchaseApi)
