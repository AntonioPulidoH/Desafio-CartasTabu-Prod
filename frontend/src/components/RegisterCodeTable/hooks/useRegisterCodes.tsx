import { useState } from "react";
import { registerCodeService, type RegisterCode, type Role } from "../services/register-code-service";
import toast from "react-hot-toast";

export const useRegisterCodes = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [generatedCode, setGeneratedCode] = useState<RegisterCode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createCode = async (roleId: number, customCode?: string, expiresAt?: string) => {
    try {
      setLoading(true);
      const data = {
        roleId,
        ...(customCode && { code: customCode }),
        ...(expiresAt && { expiresAt }),
      };
      const code = await registerCodeService.createCode(data);
      setGeneratedCode(code);
      toast.success("Código generado correctamente.");
      return code;
    } catch (err: any) {
      console.error("Error al generar el código", err);
      const backendError = err.response?.data?.message || "Error al generar el código";
      toast.error(`No se pudo generar: ${backendError}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await registerCodeService.getRoles();
      setRoles(data);
    } catch (err) {
      console.error("Error al cargar los roles", err);
      toast.error("Error al cargar los roles.");
    }
  };

  return {
    roles,
    generatedCode,
    loading,
    createCode,
    fetchRoles
  };
};
