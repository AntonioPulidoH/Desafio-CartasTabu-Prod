import apiClient from "./apiClient";

export const familyService = {
  getAll: async () => {
    const response = await apiClient.get("/families");
    return response.data;
  },
};