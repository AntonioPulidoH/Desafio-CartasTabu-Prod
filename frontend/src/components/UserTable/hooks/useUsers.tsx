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

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Error al eliminar el usuario", err);
        alert("Error al eliminar el usuario");
      }
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
    handleDelete,
    updateRole,
    fetchUsers,
  };
};
