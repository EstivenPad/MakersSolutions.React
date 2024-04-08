import axios from "axios";

export const makersSolutionsAPI = axios.create({
    baseURL: 'https://localhost:7170/api'
})