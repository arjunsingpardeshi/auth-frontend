import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "devlopment" ? "http://localhost:8080/api/v1/users" : "/api/v1/users",
    withCredentials: true
})