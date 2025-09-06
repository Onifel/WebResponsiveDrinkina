import axios from "axios";

const API = axios.create({
    baseURL:"https://34.230.11.212:8080/api/auth",
})

export const requestCode = (name, phone, email) => 
    API.post("/request-code", {name, phone, email})

export const verifyCode = (phone, code, name, email) => 
    API.post("/verify-code", {phone, code, name, email})

export const updateUser = (id, updatedUser) => 
    API.put(`/users/${id}`, updatedUser)