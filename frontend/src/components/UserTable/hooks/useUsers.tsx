/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { userService, type User } from "../services/user-service";
import toast from "react-hot-toast";

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
      toast.error("Error al conectar con el servidor.");
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

      toast.success("Usuario creado correctamente.");

      return true;
    } catch (err: any) {
      console.error("Error al crear el usuario", err);
      const backendError =
        err.response?.data?.message || "Error al crear el usuario";

      toast.error(`No se pudo crear: ${backendError}`);

      return false;
    }
  };

  // Eliminar usuario
  const deleteUserById = async (id: number) => {
    try {
      await userService.deleteUser(id);
      await fetchUsers();

      toast.success("Usuario eliminado correctamente.");
      return true;
    } catch (err) {
      console.error("Error al eliminar el usuario", err);
      toast.error("Error al eliminar al usuario.");
      return false;
    }
  };

  // Editar el rol
  const updateRole = async (id: number, roleId: number) => {
    try {
      await userService.updateUserRole(id, roleId);
      await fetchUsers();

      toast.success("Rol actualizado correctamente.")
      return true;
    } catch (err) {
      console.error("Error al actualizar el rol", err);
      toast.error("Error al actualizar el rol");
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
