import apiClient from "./apiClient";

export type CreateThemeRequest = {
  name: string;
  description?: string;
  vocationalFamilyId: number;
};

export const themeService = {
  getAll: async () => {
    const response = await apiClient.get("/themes");
    return response.data.map((theme: any) => ({
      ...theme,
      cards: (theme.cards ?? []).map((card: any) => ({
        id: String(card.id),
        word: card.keyword,
        forbiddenWords: (card.forbiddenWords ?? []).map((fw: any) => fw.word),
      })),
    }));
  },

  getPublic: async (id: number) => {
    const response = await apiClient.get(`/themes/${id}/public`);
    return response.data;
  },

  create: async (payload: CreateThemeRequest) => {
    const response = await apiClient.post("/themes", payload);
    return response.data;
  },

  update: async (id: string, payload: Partial<{ name: string; description: string; vocationalFamilyId: number }>) => {
    const response = await apiClient.patch(`/themes/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/themes/${id}`);
    return response.data;
  },
};