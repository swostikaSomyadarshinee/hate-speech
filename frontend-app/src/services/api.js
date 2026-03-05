import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const predictText = (text, model) =>
  API.post("/predict", { text, model });

export const getModels = () =>
  API.get("/models");

export const getComparison = () =>
  API.get("/comparison");