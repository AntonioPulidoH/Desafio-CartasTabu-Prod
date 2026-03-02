import { useState } from "react";
import type { Theme } from "../services/theme-service";

export const useThemeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vocationalFamilyId: 1,
    creatorId: 12, // Cuando el Login esté listo, cambiar el 12 por currentUser.id
  });

  const openAddModal = () => {
    setModalMode("create");
    setFormData({
      name: "",
      description: "",
      vocationalFamilyId: 1,
      creatorId: 12, // Cuando el Login esté listo, cambiar el 12 por currentUser.id
    });
    setIsOpen(true);
  };

  const openEditModal = (theme: Theme) => {
    setModalMode("edit");
    setSelectedTheme(theme);
    setFormData({
      name: theme.name,
      description: theme.description || "",
      vocationalFamilyId: theme.vocationalFamilyId,
      creatorId: theme.creatorId,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTheme(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "vocationalFamilyId" || name === "creatorId"
          ? Number(value)
          : value,
    }));
  };

  return {
    isOpen,
    modalMode,
    selectedTheme,
    formData,
    openAddModal,
    openEditModal,
    closeModal,
    handleInputChange,
  };
};
