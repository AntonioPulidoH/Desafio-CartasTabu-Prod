import { useState } from "react";
import type { User } from "../services/user-service";

export const useDeleteModal = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  return {
    isDeleteOpen,
    userToDelete,
    openDeleteModal,
    closeDeleteModal,
  };
};
