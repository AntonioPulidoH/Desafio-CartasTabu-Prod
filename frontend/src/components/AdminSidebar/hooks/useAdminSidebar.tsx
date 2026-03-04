import { useState } from "react";

export const useAdminSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Abrir y cerrar menú hamburguesa
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Cerrarlo
  const closeMenu = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
