import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3333/v1'
  baseURL: 'https://api-esoja.herokuapp.com/v1'
});
