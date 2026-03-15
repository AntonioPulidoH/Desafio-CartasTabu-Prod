import apiClient from "./apiClient";

export type CreateCardRequest = {
  keyword: string;
  themeId: number;
  forbiddenWords: string[];
};

export const cardService = {
  getByTheme: async (themeId: number) => {
    const response = await apiClient.get(`/cards/themes/${themeId}`);
    return response.data.map((card: any) => ({
      id: String(card.id),
      word: card.word,
      forbiddenWords: card.forbiddenWords ?? [],
    }));
  },

  create: async (payload: CreateCardRequest) => {
    const response = await apiClient.post("/cards", payload);
    return response.data;
  },

  update: async (id: string, payload: Partial<{ keyword: string; forbiddenWords: string[] }>) => {
    const response = await apiClient.patch(`/cards/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/cards/${id}`);
    return response.data;
  },
};