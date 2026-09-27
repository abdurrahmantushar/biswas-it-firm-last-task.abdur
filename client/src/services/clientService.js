import api from "./api";

export const getClients = async () => {
  const response = await api.get("/users/clients");
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await api.delete(`/users/clients/${id}`);
  return response.data;
};