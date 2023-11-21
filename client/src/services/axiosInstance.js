import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default api;
