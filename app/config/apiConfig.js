import axios from "axios";

 const baseUrl = "https://api.topplaced.com/api/";

const API = axios.create({
     baseURL: "https://api.topplaced.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
export { API, baseUrl };
