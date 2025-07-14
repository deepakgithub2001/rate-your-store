// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Rails API URL
  withCredentials: true
})

export default api;
