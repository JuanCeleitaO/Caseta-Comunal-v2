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
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
  };

  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await axios.post(`${API_URL}/reportes`, formData, {
    headers,
  });
  return response.data;
};
export const eliminarReporte = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/reportes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
