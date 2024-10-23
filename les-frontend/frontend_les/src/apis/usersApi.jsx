import { api } from './configs/axiosConfig';
import { defineCancelApiObject } from './configs/axiosUtils';

export const userApi = {
  getUsersTable: async function ( cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/user/table`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  deleteUser: async function ( userId, cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/user/delete`,
      method: "POST",
      data: {userId: userId},
      headers: { 'Content-Type': 'application/json' },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  },

  getUserById: async function ( userId, cancel = false) {
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/user/getById?userId=${userId}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
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
    const response = await api.request({
      url: `${process.env.REACT_APP_BACKEND_URL}/user/update`,
      method: "POST",
      data: JSON.stringify({userId: userId, userObject: userObject}),
      headers: { 'Content-Type': 'application/json' },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data;
  }
}
  
const cancelApiObject = defineCancelApiObject(userApi)
  