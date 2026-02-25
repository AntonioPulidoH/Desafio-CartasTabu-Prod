import { Edit, Trash2, UserPlus } from "lucide-react";
import { useUsers } from "./hooks/useUsers";
import "./UserTable.css";

export const UserTable = () => {
  const { users, loading, error, handleDelete, handleEditRole } = useUsers();

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
                      onClick={() => handleEditRole(user.id)}
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

            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-3 text-muted">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
