import api from "./api";

export const getPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

export const updatePayment = async (id, paymentData) => {
  const response = await api.put(`/payments/${id}`, paymentData);
  return response.data;
};