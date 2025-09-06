import axios from "axios";

const API = axios.create({
  baseURL: "https://api.drinkina.org/api/orders",
});

export const createOrderRequest = (orderData) => API.post("", orderData)

export const fetchOrders = () => API.get("")

export const getByIdOrder = (id) => API.get(`/${id}`)

export const deleteOrder = (id) => API.delete(`/${id}`)
