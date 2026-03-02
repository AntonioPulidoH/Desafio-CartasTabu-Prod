import { Edit, Trash2, PlusCircle } from "lucide-react";
import { useThemes } from "./hooks/useThemes";
import { useThemeModal } from "./hooks/useThemeModal";
import { useDeleteThemeModal } from "./hooks/useDeleteThemeModal";
import { useVocationalFamilies } from "./hooks/useVocationalFamilies";
import { usePagination } from "../UserTable/hooks/usePagination";
import { Modal } from "../ui/Modal/Modal";
import "../UserTable/UserTable.css";

export const ThemeTable = () => {
  // Hook Datos y CRUD
  const { themes, loading, error, createTheme, editTheme, deleteThemeById } =
    useThemes();

  // Hook Paginación
  const {
    currentPage,
    totalPages,
    currentItems: currentThemes,
    indexOfFirstItem,
    indexOfLastItem,
    goToNextPage,
    goToPrevPage,
  } = usePagination(themes, 5);

  // Hook Modal Crear/Editar
  const {
    isOpen,
    modalMode,
    selectedTheme,
    formData,
    openAddModal,
    openEditModal,
    closeModal,
    handleInputChange,
  } = useThemeModal();

  // Hook Modal Borrar
  const { isDeleteOpen, themeToDelete, openDeleteModal, closeDeleteModal } =
    useDeleteThemeModal();

  // Hook Cargar Familias Prof
  const { families, loadingFamilies } = useVocationalFamilies();

  const handleSubmit = async () => {
    let success = false;
    if (modalMode === "create") {
      success = await createTheme(formData);
    } else if (modalMode === "edit" && selectedTheme) {
      success = await editTheme(selectedTheme.id, formData);
    }
    if (success) closeModal();
  };

  const handleConfirmDelete = async () => {
    if (themeToDelete) {
      const success = await deleteThemeById(themeToDelete.id);
      if (success) closeDeleteModal();
    }
  };

  if (loading)
    return <div className="p-4 text-center mt-4">Cargando temáticas...</div>;
  if (error)
    return <div className="p-4 text-center text-danger mt-4">{error}</div>;

  return (
    <div className="tabu-table-container bg-white p-4 shadow-sm mt-4">
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold tabu-text-primary">Temas Globales</h4>
        <button
          className="btn tabu-btn-primary d-flex align-items-center gap-2"
          onClick={openAddModal}
        >
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
            {themes.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No hay temáticas registradas todavía.
                </td>
              </tr>
            ) : (
              currentThemes.map((theme) => (
                <tr key={theme.id}>
                  <td className="fw-medium">{theme.name}</td>
                  <td>{theme.vocationalFamily?.name || "Sin Familia"}</td>
                  <td>{theme._count?.cards || 0}</td>
                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm tabu-action-btn edit-btn"
                        title="Editar"
                        onClick={() => openEditModal(theme)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm tabu-action-btn delete-btn"
                        title="Eliminar"
                        onClick={() => openDeleteModal(theme)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controles Paginación*/}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <span className="text-muted small">
            Mostrando del {indexOfFirstItem + 1} al{" "}
            {Math.min(indexOfLastItem, themes.length)} de {themes.length}{" "}
            temáticas
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link shadow-none"
                  onClick={goToPrevPage}
                >
                  Anterior
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link text-dark bg-light border-light">
                  Página {currentPage} de {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link shadow-none"
                  onClick={goToNextPage}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modal Crear/Editar Temática */}
      <Modal
        isOpen={isOpen}
        title={
          modalMode === "create" ? "Añadir Nueva Temática" : "Editar Temática"
        }
        onClose={closeModal}
        footer={
          <>
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
              onClick={handleSubmit}
              disabled={!formData.name}
            >
              {modalMode === "create" ? "Crear Temática" : "Guardar Cambios"}
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label fw-medium">
              Nombre de la Temática *
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. Hardware"
            />
          </div>
          <div className="col-12">
            <label className="form-label fw-medium">
              Descripción (Opcional)
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Breve descripción del tema"
            />
          </div>
          <div className="col-12">
            <label className="form-label fw-medium">
              Familia Profesional *
            </label>
            <select
              className="form-select"
              name="vocationalFamilyId"
              value={formData.vocationalFamilyId}
              onChange={handleInputChange}
              disabled={loadingFamilies}
            >
              {loadingFamilies ? (
                <option value="">Cargando familias...</option>
              ) : families.length === 0 ? (
                <option value="">No hay familias disponibles</option>
              ) : (
                families.map((family) => (
                  <option key={family.id} value={family.id}>
                    {family.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </Modal>

      {/* Modal Borrar Temática */}
      <Modal
        isOpen={isDeleteOpen}
        title="Eliminar Temática"
        onClose={closeDeleteModal}
        footer={
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={closeDeleteModal}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={handleConfirmDelete}
            >
              Eliminar Definitivamente
            </button>
          </>
        }
      >
        {themeToDelete && (
          <p className="mb-1 text-muted">
            ¿Estás seguro de que deseas eliminar la temática{" "}
            <strong>{themeToDelete.name}</strong>? Las cartas asociadas también
            se borrarán en cascada.
          </p>
        )}
      </Modal>
    </div>
  );
};
