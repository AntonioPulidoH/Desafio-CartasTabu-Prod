import axios from "axios";
import type { VocationalFamily } from "./theme-service";

const API_URL = `${import.meta.env.VITE_LOCAL_API_URL}/vocational-families`;

export const vocationalFamilyService = {
  getAllFamilies: async (): Promise<VocationalFamily[]> => {
    const response = await axios.get<VocationalFamily[]>(API_URL);
    return response.data;
  },
};
