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
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/beverage/toCart?cartObject=${cartObject}`,
    //   method: "POST",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      status: 200,
      message: `Produto ${cartObject.beverageId} adicionado ao carrinho!`

      // resposta simulada de erro:
      // status: 500,
      // message: `Erro ao adicionar ${cartObject.beverageId} ao carrinho!`
    }
    console.log(cartObject);

    return response;
  },

  getCartBeverages: async function ( cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/beverage/getCart`,
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })
    const imageUrl = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18eee587f18%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18eee587f18%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"

    var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
      status: 200,
      data: [
        { beverageId: 1, beverageLabel: "Château Margaux", beverageValue: 1500.00, beverageYear: 2015, beverageManufacturer: "Château Margaux", beverageCountry: "France", beverageAlcoholContent: 13.5, beverageVolume: 0.75, beverageQuantity: 2, imageUrl: imageUrl },
        { beverageId: 2, beverageLabel: "Penfolds Grange", beverageValue: 850.00, beverageYear: 2016, beverageManufacturer: "Penfolds", beverageCountry: "Australia", beverageAlcoholContent: 14.5, beverageVolume: 0.75, beverageQuantity: 1, imageUrl: imageUrl },
        { beverageId: 3, beverageLabel: "Casa Valduga Gran Reserva", beverageValue: 200.00, beverageYear: 2018, beverageManufacturer: "Casa Valduga", beverageCountry: "Brazil", beverageAlcoholContent: 13.0, beverageVolume: 0.75, beverageQuantity: 3, imageUrl: imageUrl },
        { beverageId: 4, beverageLabel: "Miolo Lote 43", beverageValue: 120.00, beverageYear: 2019, beverageManufacturer: "Miolo", beverageCountry: "Brazil", beverageAlcoholContent: 12.5, beverageVolume: 0.75, beverageQuantity: 5, imageUrl: imageUrl },
        { beverageId: 5, beverageLabel: "Heineken", beverageValue: 3.00, beverageYear: 2023, beverageManufacturer: "Heineken N.V.", beverageCountry: "Netherlands", beverageAlcoholContent: 5.0, beverageVolume: 0.33, beverageQuantity: 12, imageUrl: imageUrl },
        { beverageId: 6, beverageLabel: "Skol", beverageValue: 2.50, beverageYear: 2023, beverageManufacturer: "Ambev", beverageCountry: "Brazil", beverageAlcoholContent: 4.7, beverageVolume: 0.33, beverageQuantity: 8, imageUrl: imageUrl },
        { beverageId: 7, beverageLabel: "Ypióca", beverageValue: 20.00, beverageYear: 2023, beverageManufacturer: "Ypióca", beverageCountry: "Brazil", beverageAlcoholContent: 39.0, beverageVolume: 0.7, beverageQuantity: 6, imageUrl: imageUrl }
      ]

      // resposta simulada de erro:
      // status: 500,
      // message: "Erro ao buscar produtos do carrinho!"
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
