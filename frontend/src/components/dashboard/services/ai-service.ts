import axios from "axios";

const API_URL = `${import.meta.env.VITE_LOCAL_API_URL}/ai`;

export interface GenerateCollectionPayload {
  vocationalFamily: string;
  topic?: string;
  amount: number;
  context?: string;
}

export interface GeneratedCollectionResponse {
  name: string;
  description: string;
  cards: {
    keyword: string;
    forbiddenWords: string[];
  }[];
}

export const aiService = {
  generateCollection: async (
    payload: GenerateCollectionPayload,
  ): Promise<GeneratedCollectionResponse> => {
    const token = sessionStorage.getItem("access_token");

    if (!token) throw new Error("No estás autenticado");

    const response = await axios.post<GeneratedCollectionResponse>(
      `${API_URL}/generate-collection`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
