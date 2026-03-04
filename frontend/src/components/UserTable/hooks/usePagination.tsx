import { useState } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula total págs
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastItem = safeCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
  };
};
