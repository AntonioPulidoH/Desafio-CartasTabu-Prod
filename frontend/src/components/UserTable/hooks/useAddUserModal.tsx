import { useState } from "react";

export const useAddUserModal = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const initialForm = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    roleId: 3,
    educationalCenter: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const openAddModal = () => setIsAddOpen(true);

  const closeAddModal = () => {
    setIsAddOpen(false);
    setFormData(initialForm);
  };

  // Función para cambios en los inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roleId" ? Number(value) : value,
    }));
  };

  return {
    isAddOpen,
    formData,
    openAddModal,
    closeAddModal,
    handleInputChange,
  };
};
