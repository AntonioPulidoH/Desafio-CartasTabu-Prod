/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { userService, type User } from "../services/user-service";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar los usuarios:", err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios cuando se monta el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear Usuario
  const addUser = async (userData: any) => {
    try {
      await userService.createUser(userData);
      await fetchUsers();

      return true;
    } catch (err: any) {
      console.error("Error al crear el usuario", err);
      const backendError =
        err.response?.data?.message || "Error al crear el usuario";

      alert(`No se pudo crear: ${backendError}`);
      return false;
    }
  };

  // Eliminar usuario
  const deleteUserById = async (id: number) => {
    try {
      await userService.deleteUser(id);
      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Error al eliminar el usuario", err);
      alert("Error al eliminar el usuario");
      return false;
    }
  };

  // Editar el rol
  const updateRole = async (id: number, roleId: number) => {
    try {
      await userService.updateUserRole(id, roleId);
      await fetchUsers();
      return true;
    } catch (err) {
      console.error("Error al actualizar el rol", err);
      alert("Error al actualizar el rol");
      return false;
    }
  };

  return {
    users,
    loading,
    error,
    deleteUserById,
    updateRole,
    addUser,
    fetchUsers,
  };
};
