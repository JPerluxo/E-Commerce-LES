//import { api } from './configs/axiosConfig';
//import { defineCancelApiObject } from './configs/axiosUtils';

export const userApi = {
    getUsers: async function ( cancel = false) {
      // const response = await api.request({
      //   url: `${process.env.REACT_APP_BACKEND_URL}/user/all`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
      //   method: "GET",
      //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      // })
  
      var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
        status:200,
        data: {
          collumns: ["ID", "NOME COMPLETO", "CPF", "ATIVO", "AÇÃO"],
          rows: [
            { id: 1, name: "Jefferson", cpf: 11122233344, isActive: true },
            { id: 2, name: "Sintia", cpf: 22233344455, isActive: true },
            { id: 3, name: "João", cpf: 33344455566, isActive: false },
            { id: 4, name: "Rodrigo", cpf: 44455566677, isActive: false },
            { id: 5, name: "Paulo", cpf: 55566677788, isActive: false },
            { id: 6, name: "Carol", cpf: 66677788899, isActive: true },
            { id: 7, name: "Iago", cpf: 77788899900, isActive: false },
            { id: 8, name: "Juliana", cpf: 88899900011, isActive: true },
            { id: 9, name: "Felipe", cpf: 99900011122, isActive: true },
            { id: 10, name: "Maria", cpf: 11100022233, isActive: false },
            { id: 11, name: "Lucas", cpf: 22200033344, isActive: true },
            { id: 12, name: "Ana", cpf: 33300044455, isActive: false },
            { id: 13, name: "Pedro", cpf: 44400055566, isActive: true },
            { id: 14, name: "Rafaela", cpf: 55500066677, isActive: false }
          ]
        }
      }
  
      return response;
    }
  }
  
  //const cancelApiObject = defineCancelApiObject(userApi)
  