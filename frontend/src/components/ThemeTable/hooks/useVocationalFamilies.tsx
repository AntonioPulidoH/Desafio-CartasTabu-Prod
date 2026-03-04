import { useState, useEffect } from "react";
import { vocationalFamilyService } from "../services/vocational-family-service";
import type { VocationalFamily } from "../services/theme-service";
import toast from "react-hot-toast";

export const useVocationalFamilies = () => {
  const [families, setFamilies] = useState<VocationalFamily[]>([]);
  const [loadingFamilies, setLoadingFamilies] = useState(true);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const data = await vocationalFamilyService.getAllFamilies();
        setFamilies(data);
      } catch (error) {
        console.error("Error al cargar las familias profesionales:", error);
        toast.error("Error al cargar la lista de familias.");
      } finally {
        setLoadingFamilies(false);
      }
    };

    fetchFamilies();
  }, []);

  return { families, loadingFamilies };
};