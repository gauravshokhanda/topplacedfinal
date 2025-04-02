import axios from "axios";

// const baseUrl = "https://g32.iamdeveloper.in/public/";
const baseUrl = "http://localhost:5100/api/";

const API = axios.create({
    // baseURL: "https://g32.iamdeveloper.in/api/",
    baseURL: "http://localhost:5100/api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export { API, baseUrl };