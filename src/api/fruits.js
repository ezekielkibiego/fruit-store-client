import API from "./axios";

export const getFruits = () => API.get("/api/fruits");
export const createFruit = (data) => API.post("/api/fruits", data);
export const updateFruit = (id, data) => API.put(`/api/fruits/${id}`, data);
export const deleteFruit = (id) => API.delete(`/api/fruits/${id}`);