import axios from "axios";

const API = axios.create({
  baseURL: "https://34.230.11.212:8080/api/orders",
});

export const createOrderRequest = (orderData) => API.post("", orderData)

export const fetchOrders = () => API.get("")

export const getByIdOrder = (id) => API.get(`/${id}`)

export const deleteOrder = (id) => API.delete(`/${id}`)
