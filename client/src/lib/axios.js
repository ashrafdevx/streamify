import axios from "axios";
export const InstanceAxios = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});
