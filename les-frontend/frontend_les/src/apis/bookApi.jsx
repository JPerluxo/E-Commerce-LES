//import { api } from './configs/axiosConfig';
//import { defineCancelApiObject } from './configs/axiosUtils';

export const bookApi = {
  getBookByTitle: async function (name, cancel = false) {
    // const response = await api.request({
    //   url: `${process.env.REACT_APP_BACKEND_URL}/book/${name}`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
    //   method: "GET",
    //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    // })

    var response = { //resposta mockada para testes
      data: [
        {id: 0, title: "Livro 0"},
        {id: 1, title: "Livro 1"},
        {id: 2, title: "Livro 2"},
        {id: 3, title: "Livro 3"}
      ]
    }

    return response.data;
  }
}

//const cancelApiObject = defineCancelApiObject(bookApi)
