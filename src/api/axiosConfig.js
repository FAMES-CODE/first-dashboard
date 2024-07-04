import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1", // + /auth
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default axiosConfig;
