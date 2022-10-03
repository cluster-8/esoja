import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3333/v1'
  baseURL: 'https://api-esoja.herokuapp.com/v1'
});

export const api2= axios.create({
  baseURL:'http://172.16.4.91:8080'
})
