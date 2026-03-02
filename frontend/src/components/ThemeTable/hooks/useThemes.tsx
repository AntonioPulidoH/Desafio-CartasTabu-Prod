/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { themeService, type Theme } from "../services/theme-service";
import toast from "react-hot-toast";

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchThemes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await themeService.getAllThemes();
      setThemes(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching themes:", err);
      setError("No se pudieron cargar las temáticas.");
      toast.error("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  // Crear Tema/Categoría
  const createTheme = async (themeData: any) => {
    try {
      const newTheme = await themeService.createTheme(themeData);
      setThemes((prev) => [newTheme, ...prev]);
      toast.success("Temática creada correctamente.");
      return true;
    } catch (err: any) {
      const backendError =
        err.response?.data?.message || "Error al crear la temática";
      toast.error(`No se pudo crear: ${backendError}`);
      return false;
    }
  };

  // Editar Tema/Categoría
  const editTheme = async (id: number, themeData: any) => {
    try {
      const updatedTheme = await themeService.updateTheme(id, themeData);
      setThemes((prev) =>
        prev.map((theme) =>
          theme.id === id ? { ...theme, ...updatedTheme } : theme,
        ),
      );
      toast.success("Temática actualizada correctamente.");
      return true;
    } catch (err: any) {
      toast.error("Error al actualizar la temática.");
      return false;
    }
  };

  // Eliminar Tema/Categoría
  const deleteThemeById = async (id: number) => {
    try {
      await themeService.deleteTheme(id);
      setThemes((prev) => prev.filter((theme) => theme.id !== id));
      toast.success("Temática eliminada correctamente.");
      return true;
    } catch (err: any) {
      toast.error("Error al eliminar la temática.");
      return false;
    }
  };

  return {
    themes,
    loading,
    error,
    createTheme,
    editTheme,
    deleteThemeById,
  };
};
