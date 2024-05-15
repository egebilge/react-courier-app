import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

console.log("baseURL", baseURL);

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: false,
});
