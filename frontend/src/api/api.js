import axios from "axios";

const API = axios.create({
  baseURL: "https://invoice-management-system-api-z5lx.onrender.com/api",
});

export default API;