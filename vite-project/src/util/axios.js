import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8080/api/v1/users" : "https://api.freeapi.app/api/v1/users",
    withCredentials: true
})