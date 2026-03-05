import axios from "axios";

const API_URL = `${import.meta.env.VITE_LOCAL_API_URL}/themes`;

export interface VocationalFamily {
  id: number;
  name: string;
}

export interface Creator {
  id: number;
  name: string;
  lastName: string;
}

export interface Theme {
  id: number;
  name: string;
  description: string | null;
  vocationalFamilyId: number;
  creatorId: number;
  vocationalFamily: VocationalFamily;
  creator: Creator;
  _count?: {
    cards: number;
  };
  createdAt: string;
  updatedAt: string;
}

export const themeService = {
  getAllThemes: async (): Promise<Theme[]> => {
    const response = await axios.get<Theme[]>(API_URL);
    return response.data;
  },

  getThemeById: async (id: number): Promise<Theme> => {
    const response = await axios.get<Theme>(`${API_URL}/${id}`);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createTheme: async (themeData: any): Promise<Theme> => {
    const response = await axios.post<Theme>(API_URL, themeData);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateTheme: async (id: number, themeData: any): Promise<Theme> => {
    const response = await axios.patch<Theme>(`${API_URL}/${id}`, themeData);
    return response.data;
  },

  deleteTheme: async (id: number): Promise<{ message: string }> => {
    const response = await axios.delete<{ message: string }>(
      `${API_URL}/${id}`,
    );
    return response.data;
  },
};
