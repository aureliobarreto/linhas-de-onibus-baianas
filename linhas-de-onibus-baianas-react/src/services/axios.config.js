import axios from "axios";

const api = axios.create({
  baseURL: "https://linhas-de-onibus-server.onrender.com",
});

export default api;