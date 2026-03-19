import axios from "axios";
import type { VocationalFamily } from "./theme-service";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/vocational-families`;

export const vocationalFamilyService = {
  getAllFamilies: async (): Promise<VocationalFamily[]> => {
    const response = await axios.get<VocationalFamily[]>(API_URL);
    return response.data;
  },
};