// Ruta: src/components/UserTable/hooks/useRoleModal.ts
import { useState } from "react";
import type { User } from "../services/user-service";

export const useRoleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRoleId, setNewRoleId] = useState<number | "">("");

  const openModal = (user: User) => {
    setSelectedUser(user);
    setNewRoleId(user.role?.id || ""); 
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setNewRoleId("");
  };

  return {
    isOpen,
    selectedUser,
    newRoleId,
    setNewRoleId,
    openModal,
    closeModal,
  };
};