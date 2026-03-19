import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/ai`;

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

export interface GenerateCardsPayload {
  vocationalFamily: string;
  amount: number;
  context?: string;
}

export interface GeneratedCardsResponse {
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

    if (!token) throw new Error("No estas autenticado");

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

  generateCards: async (
    payload: GenerateCardsPayload,
  ): Promise<GeneratedCardsResponse> => {
    const token = sessionStorage.getItem("access_token");
    if (!token) throw new Error("No estas autenticado");

    const response = await axios.post<GeneratedCardsResponse>(
      `${API_URL}/generate-cards`,
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
