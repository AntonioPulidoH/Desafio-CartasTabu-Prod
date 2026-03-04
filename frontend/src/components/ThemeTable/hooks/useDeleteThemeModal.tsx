import { useState } from "react";
import type { Theme } from "../services/theme-service";

export const useDeleteThemeModal = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [themeToDelete, setThemeToDelete] = useState<Theme | null>(null);

  const openDeleteModal = (theme: Theme) => {
    setThemeToDelete(theme);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setThemeToDelete(null);
  };

  return {
    isDeleteOpen,
    themeToDelete,
    openDeleteModal,
    closeDeleteModal,
  };
};
