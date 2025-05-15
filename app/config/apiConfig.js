import axios from "axios";

 const baseUrl = "https://api.topplaced.com/api/";
// const baseUrl = "https://localhost:5100/api/";

const API = axios.create({
  //  baseURL: "https://api.topplaced.com/api/",
  // baseURL: "http://localhost:5100/api/",
  baseURL: "https://testing.topplaced.com/api",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export { API, baseUrl };
