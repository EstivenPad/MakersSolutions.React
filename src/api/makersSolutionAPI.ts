import axios from "axios";

export const makersSolutionsAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})