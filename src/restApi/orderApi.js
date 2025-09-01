import axios from "axios";

const API = axios.create({
  baseURL: "http://18.222.169.12:8080/api/orders",
});

export const createOrderRequest = (orderData) => API.post("", orderData)

export const fetchOrders = () => API.get("")

export const getByIdOrder = (id) => API.get(`/${id}`)

export const deleteOrder = (id) => API.delete(`/${id}`)
