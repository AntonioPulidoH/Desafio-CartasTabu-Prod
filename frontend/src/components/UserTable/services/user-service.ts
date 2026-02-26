import axios from "axios";

const API_URL = "http://localhost:3000/users";

export interface Role {
  id: number;
  name: string;
}

export interface VocationalFamily {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  educationalCenter: string | null;
  role: Role;
  vocationalFamily: VocationalFamily | null;
  createdAt: string;
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_URL);
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/${id}`);
    return response.data;
  },

  updateUserRole: async (id: number, roleId: number): Promise<User> => {
    const response = await axios.patch<User>(`${API_URL}/${id}/role`, {
      roleId,
    });
    return response.data;
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    const response = await axios.delete<{ message: string }>(
      `${API_URL}/${id}`,
    );
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createUser: async (userData: any): Promise<User> => {
    const response = await axios.post<User>(`${API_URL}/register`, userData);
    return response.data;
  },
};
