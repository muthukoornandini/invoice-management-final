import axios from "axios";

const API = axios.create({
  baseURL: "https://invoice-management-final.onrender.com/api",
});

export default API;