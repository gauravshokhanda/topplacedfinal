import axios from "axios";

const baseUrl = "https://api.topplaced.com/api/";
// const baseUrl = "http://localhost:5100/api/";

const API = axios.create({
    baseURL: "https://api.topplaced.com/api/",
    // baseURL: "http://localhost:5100/api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export { API, baseUrl };