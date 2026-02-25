import { Edit, Trash2, UserPlus } from "lucide-react";
import { useUsers } from "./hooks/useUsers";
import { useRoleModal } from "./hooks/useRoleModal";
import "./UserTable.css";

export const UserTable = () => {
  const { users, loading, error, handleDelete, updateRole } = useUsers();
  const {
    isOpen,
    selectedUser,
    newRoleId,
    setNewRoleId,
    openModal,
    closeModal,
  } = useRoleModal();

  // Conecta el modal con la API
  const handleSaveRole = async () => {
    if (selectedUser && newRoleId !== "") {
      const success = await updateRole(selectedUser.id, Number(newRoleId));
      if (success) {
        closeModal();
      }
    }
  };

  if (loading)
    return <div className="p-4 text-center">Cargando usuarios...</div>;
  if (error) return <div className="p-4 text-center text-danger">{error}</div>;

  return (
    <div className="tabu-table-container bg-white p-4 shadow-sm mt-4">
      {/* Cabecera Tabla */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold tabu-text-primary">Usuarios Registrados</h4>
        <button className="btn tabu-btn-primary d-flex align-items-center gap-2">
          <UserPlus size={18} />
          <span>Añadir Usuario</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table tabu-table align-middle mb-0">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fw-medium">{`${user.name} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td>{user.role?.name || "Sin Rol"}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm tabu-action-btn edit-btn"
                      title="Editar Rol"
                      onClick={() => openModal(user)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn btn-sm tabu-action-btn delete-btn"
                      title="Eliminar"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar Rol */}
      {isOpen && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title fw-bold tabu-text-primary">
                  Editar Rol de Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                {selectedUser && (
                  <p className="mb-3 text-muted">
                    Estás modificando los permisos de{" "}
                    <strong>
                      {selectedUser.name} {selectedUser.lastName}
                    </strong>
                    .
                  </p>
                )}

                <label className="form-label fw-medium">
                  Selecciona el nuevo rol:
                </label>
                <select
                  className="form-select form-select-lg"
                  value={newRoleId}
                  onChange={(e) => setNewRoleId(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Seleccione un rol...
                  </option>
                  <option value={1}>ADMIN</option>
                  <option value={2}>CREATOR</option>
                  <option value={3}>USER</option>
                </select>
              </div>

              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn tabu-btn-primary px-4"
                  onClick={handleSaveRole}
                  disabled={newRoleId === ""}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
