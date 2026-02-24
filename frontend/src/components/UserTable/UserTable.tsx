import { Edit, Trash2, UserPlus } from "lucide-react";
import "./UserTable.css";

// Mock para probar
const mockUsers = [
  {
    id: 1,
    name: "Anna Pamez",
    email: "nomrs21@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "John Mimca",
    email: "marwhca@gmail.com",
    role: "Usuario Creador",
  },
  {
    id: 3,
    name: "Bedez Ahrkam",
    email: "borfererr@gmail.com",
    role: "Usuario",
  },
  {
    id: 4,
    name: "Martín Broránez",
    email: "noow11@gmail.com",
    role: "Usuario",
  },
  {
    id: 5,
    name: "Josse Melle",
    email: "janaMaa@gmail.com",
    role: "Usuario creador",
  },
];

export const UserTable = () => {
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
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="fw-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm tabu-action-btn edit-btn"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn btn-sm tabu-action-btn delete-btn"
                      title="Eliminar"
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
    </div>
  );
};
