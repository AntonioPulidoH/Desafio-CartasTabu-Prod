import { Edit, Trash2, PlusCircle } from "lucide-react";
import "../UserTable/UserTable.css";

const mockThemes = [
  {
    id: 1,
    name: "Ciencias Naturales",
    family: "Educación Secundaria",
    cardCount: 120,
    status: "Activo",
  },
  {
    id: 2,
    name: "Marketing Digital",
    family: "Formación Profesional",
    cardCount: 85,
    status: "Activo",
  },
  {
    id: 3,
    name: "Historia del Arte",
    family: "Bachillerato",
    cardCount: 200,
    status: "En revisión",
  },
  {
    id: 4,
    name: "Programación Web",
    family: "Formación Profesional",
    cardCount: 150,
    status: "Activo",
  },
  {
    id: 5,
    name: "Cultura General",
    family: "Ocio",
    cardCount: 300,
    status: "Inactivo",
  },
];

export const ThemeTable = () => {
  return (
    <div className="tabu-table-container bg-white p-4 shadow-sm mt-4">
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold tabu-text-primary">Temas Globales</h4>
        <button className="btn tabu-btn-primary d-flex align-items-center gap-2">
          <PlusCircle size={18} />
          <span>Nueva Temática</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table tabu-table align-middle mb-0">
          <thead>
            <tr>
              <th>Nombre del Tema</th>
              <th>Familia Profesional</th>
              <th>Nº Cartas</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockThemes.map((theme) => (
              <tr key={theme.id}>
                <td className="fw-medium">{theme.name}</td>
                <td>{theme.family}</td>
                <td>{theme.cardCount}</td>
                <td>
                  <span
                    className={`badge ${theme.status === "Activo" ? "bg-success" : theme.status === "Inactivo" ? "bg-danger" : "bg-warning text-dark"}`}
                  >
                    {theme.status}
                  </span>
                </td>
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
