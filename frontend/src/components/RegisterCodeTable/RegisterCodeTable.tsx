import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegisterCodes } from "./hooks/useRegisterCodes";
import "./RegisterCodeTable.css";

export const RegisterCodeTable = () => {
    const { roles, generatedCode, loading, createCode, fetchRoles } = useRegisterCodes();
    const [selectedRoleId, setSelectedRoleId] = useState<string>("");

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleGenerateCode = async () => {
        if (!selectedRoleId) {
            return;
        }
        await createCode(Number(selectedRoleId));
    };

    return (
        <div className="tabu-table-container bg-white p-3 shadow-sm mt-2">
            {/* Cabecera */}
            <h4 className="mb-3 fw-bold tabu-text-primary">Códigos de Registro</h4>

            {/* Formulario para generar código */}
            <div className="row g-3 mb-4 p-3 border rounded bg-light">
                <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold text-dark">Rol del Usuario</label>
                    <select
                        className="form-select"
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">Selecciona un rol...</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12 col-md-6 d-flex align-items-end">
                    <button
                        className="btn tabu-btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleGenerateCode}
                        disabled={loading || !selectedRoleId}
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="spinner-border spinner-border-sm" />
                                Generando...
                            </>
                        ) : (
                            "Generar Código"
                        )}
                    </button>
                </div>
            </div>

            {/* Código generado */}
            {generatedCode && (
                <div className="p-3 border rounded bg-success-light">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-8">
                            <div>
                                <p className="text-muted mb-1 small">Código Generado:</p>
                                <code className="fs-5 fw-bold">{generatedCode.code}</code>
                            </div>
                            <div className="mt-2">
                                <p className="text-muted mb-1 small">Expira:</p>
                                <p className="mb-0 text-dark fw-bold">
                                    {new Date(generatedCode.expiresAt).toLocaleString("es-ES")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
