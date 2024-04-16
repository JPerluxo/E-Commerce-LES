import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

const errorHandler = (error) => {
  const statusCode = error.response?.status
  if (statusCode && statusCode !== 401) console.error(error)

  return Promise.reject(error);
}

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
})
