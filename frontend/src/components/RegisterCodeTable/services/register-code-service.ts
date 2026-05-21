import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_LOCAL_API_URL || import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/users/register-code`;

export interface RegisterCode {
  id: number;
  code: string;
  roleId: number;
  used: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
}

export const registerCodeService = {
  createCode: async (data: { roleId: number; code?: string; expiresAt?: string }): Promise<RegisterCode> => {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.post<RegisterCode>(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getRoles: async (): Promise<Role[]> => {
    const response = await axios.get<Role[]>(`${API_BASE_URL}/users/roles/list`);
    return response.data;
  },
};
