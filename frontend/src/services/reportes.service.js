import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3004";

export const obtenerReportes = async (estado = "") => {
  const url = estado
    ? `${API_URL}/reportes?estado=${estado}`
    : `${API_URL}/reportes`;
  const response = await axios.get(url);
  return response.data;
};

export const crearReporte = async (formData) => {
  const response = await axios.post(`${API_URL}/reportes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
