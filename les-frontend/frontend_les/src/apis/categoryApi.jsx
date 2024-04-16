//import { api } from './configs/axiosConfig';
//import { defineCancelApiObject } from './configs/axiosUtils';

export const categoryApi = {
  getCategories: async function (cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/category/all`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes
      data: [
        {id: 0, description: "Livros de Fantasia"},
        {id: 1, description: "Livros Didáticos"}
      ]
    }

    return response.data;
  }
}

//const cancelApiObject = defineCancelApiObject(categoryApi)
