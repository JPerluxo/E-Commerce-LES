import { api } from './configs/axiosConfig';
import { defineCancelApiObject } from './configs/axiosUtils';

export const userApi = {
    getUsersTable: async function ( cancel = false) {
      // const response = await api.request({
      //   url: `${process.env.REACT_APP_BACKEND_URL}/user/table`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
      //   method: "GET",
      //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      // })
  
      var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
        status: 200,
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

        // resposta simulada de erro:
        // status: 500,
        // message: `Erro ao buscar usuários!`
      }
  
      return response;
    },

    deleteUser: async function ( userId, cancel = false) {
      // const response = await api.request({
      //   url: `${process.env.REACT_APP_BACKEND_URL}/user/delete?id=${userId}`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
      //   method: "GET",
      //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      // })
  
      var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
        status: 200,
        message: `usuário ${userId} deletado com sucesso!`

        // resposta simulada de erro:
        // status: 500,
        // message: `Erro ao remover usuário ${userId}!`
      }
  
      return response;
    },

    getUserById: async function ( userId, cancel = false) {
      // const response = await api.request({
      //   url: `${process.env.REACT_APP_BACKEND_URL}/user/getById?id=${userId}`, //PROVAVELMENTE MUDAR QUANDO IMPLEMENTAR BACKEND
      //   method: "GET",
      //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      // })
  
      var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
        status: 200,
        data: {
          id: userId,
          name: "Jefferson",
          cpf: 11122233344,
          isActive: true,
          gender: 1,
          birthDate: "2001-02-07",
          password: "teste123",
          phones: [
            {
              id: 1,
              number: "911112222",
              type: 1,
              ddd: "11"
            },
            {
              id: 2,
              number: "933334444",
              type: 2,
              ddd: "11"
            }
          ],
          addresses: [
            {
              id: 1,
              isDelivery: true,
              isBilling: false,
              streetType: "Rua",
              street: "Rua de Teste",
              number: "123",
              neighborhood: "Vila Teste",
              cep: "12345-678",
              city: "Mogi das Cruzes",
              state: "São Paulo",
              country: "Brasil"
            },
            {
              id: 2,
              isDelivery: false,
              isBilling: true,
              streetType: "Rua",
              street: "Rua Mockada",
              number: 4567,
              neighborhood: "Parque Mockado",
              cep: "90123-456",
              city: "Mogi das Cruzes",
              state: "São Paulo",
              country: "Brasil"
            }
          ],
          creditCards: [
            {
              id: 1,
              isActive: true,
              name: "JEFFERSON P. CLEMENTE",
              number: "1234 5678 9012 1234",
              cvv: "123",
              dueDate: "2030-08",
              flag: "1"
            },
            {
              id: 2,
              isActive: false,
              name: "TESTE M. OCKADO",
              number: "5678 9012 3456 7890",
              cvv: "456",
              dueDate: "2099-02",
              flag: "3"
            }
          ]
        }

        // resposta simulada de erro:
        // status: 500,
        // message: `Erro ao buscar usuário ${userId}!`
      }
  
      return response;
    },

    saveUser: async function ( userObject, cancel = false) {
      const response = await api.request({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/save`,
        method: "POST",
        data: JSON.stringify(userObject),
        headers: { 'Content-Type': 'application/json' },
        signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      })

      return response.data;
    },

    updateUser: async function ( userId, userObject, cancel = false) {
      // const response = await api.request({
      //   url: `${process.env.REACT_APP_BACKEND_URL}/user/update?userId={userId}&userObject={userObject}`,
      //   method: "POST",
      //   signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
      // })
  
      var response = { //resposta mockada para testes, provavelmente vai mudar quando implementar o backend
        status: 200,
        message: `Usuário ${userId} alterado com sucesso!`
  
        // resposta simulada de erro:
        // status: 500,
        // message: `Erro ao salvar usuário!`
      }

      return response;
    }
  }
  
  const cancelApiObject = defineCancelApiObject(userApi)
  