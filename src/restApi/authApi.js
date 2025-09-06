import axios from "axios";

const API = axios.create({
    baseURL:"http://api.drinkina.org/api/auth",
})

export const requestCode = (name, phone, email) => 
    API.post("/request-code", {name, phone, email})

export const verifyCode = (phone, code, name, email) => 
    API.post("/verify-code", {phone, code, name, email})

export const updateUser = (id, updatedUser) => 
    API.put(`/users/${id}`, updatedUser)