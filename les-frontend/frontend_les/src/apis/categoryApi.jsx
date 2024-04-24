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
        {id: 1, description: "Livros de Fantasia"},
        {id: 2, description: "Livros Didáticos"},
        {id: 3, description: "Livros de Aventura"},
        {id: 4, description: "Livros de Ciência"},
        {id: 5, description: "Livros de Drama"},
        {id: 6, description: "Livros de História"},
        {id: 7, description: "Livros de Física"},
        {id: 8, description: "Livros de Mistério"},
        {id: 9, description: "Livros de Ficção Científica"},
        {id: 10, description: "Livros de Filosofia"}
      ]
    }

    return response.data;
  }
}

//const cancelApiObject = defineCancelApiObject(categoryApi)
