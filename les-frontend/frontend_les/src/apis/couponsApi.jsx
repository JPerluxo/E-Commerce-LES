//import { api } from './configs/axiosConfig';
//import { defineCancelApiObject } from './configs/axiosUtils';

export const couponsApi = {
  getCouponsByUserId: async function (userId, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/user/getCoupons?userId=${userId}`,
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    const response = { //resposta mockada para testes
      status: 200,
      data: [
        { id: 1, code: "FRETEGRATIS", value: 100, hasBeenUsed: false, type: "Frete Grátis", userId: userId },
        { id: 2, code: "CUPOM20", value: 20, hasBeenUsed: false, type: "Desconto", userId: userId },
        { id: 3, code: "CUPOM30PERCENT", value: 30, hasBeenUsed: false, type: "Desconto", userId: userId },
        { id: 4, code: "CUPOMCOMBO", value: 15, hasBeenUsed: false, type: "Desconto em Combo", userId: userId },
        { id: 5, code: "BOASVINDAS10", value: 10, hasBeenUsed: false, type: "Desconto de Boas-Vindas", userId: userId },
        { id: 6, code: "ANIVERSARIO5", value: 5, hasBeenUsed: false, type: "Desconto de Aniversário", userId: userId }
      ]
      
      // resposta simulada de erro:
      // status: 500,
      // message: `Erro ao buscar cupons!`
    }

    return response;
  }
}

//const cancelApiObject = defineCancelApiObject(couponsApi)
