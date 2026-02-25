import { Edit, Trash2, UserPlus } from "lucide-react";
import { useUsers } from "./hooks/useUsers";
import { useRoleModal } from "./hooks/useRoleModal";
import { Modal } from "../ui/Modal/Modal";
import { useDeleteModal } from "./hooks/useDeleteModal";
import { useAddUserModal } from "./hooks/useAddUserModal";
import "./UserTable.css";

export const UserTable = () => {
  // Hook CRUD usuarios
  const { users, loading, error, deleteUserById, updateRole, addUser } =
    useUsers();

  // Hook modal cambiar rol usuario
  const {
    isOpen,
    selectedUser,
    newRoleId,
    setNewRoleId,
    openModal,
    closeModal,
  } = useRoleModal();

  // Hook modal borrar usuario
  const { isDeleteOpen, userToDelete, openDeleteModal, closeDeleteModal } =
    useDeleteModal();

  // Hook modal crear usuario
  const {
    isAddOpen,
    formData,
    openAddModal,
    closeAddModal,
    handleInputChange,
  } = useAddUserModal();

  // Conecta el modal con la API
  const handleSaveRole = async () => {
    if (selectedUser && newRoleId !== "") {
      const success = await updateRole(selectedUser.id, Number(newRoleId));
      if (success) {
        closeModal();
      }
    }
  };

  // Confirmar borrado usuario
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const success = await deleteUserById(userToDelete.id);
      if (success) closeDeleteModal();
    }
  };

  // Envía el formulario de crecaión
  const handleConfirmAdd = async () => {
    const success = await addUser(formData);
    if (success) {
      closeAddModal();
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
        <button
          className="btn tabu-btn-primary d-flex align-items-center gap-2"
          onClick={openAddModal}
        >
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
                      onClick={() => openDeleteModal(user)}
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
      <Modal
        isOpen={isOpen}
        title="Editar Rol de Usuario"
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
              onClick={handleSaveRole}
              disabled={newRoleId === ""}
            >
              Guardar Cambios
            </button>
          </>
        }
      >
        {selectedUser && (
          <p className="mb-3 text-muted">
            Estás modificando los permisos de{" "}
            <strong>
              {selectedUser.name} {selectedUser.lastName}
            </strong>
            .
          </p>
        )}
        <label className="form-label fw-medium">Selecciona el nuevo rol:</label>
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
      </Modal>

      {/* Modal Borrar Usuario */}
      <Modal
        isOpen={isDeleteOpen}
        title="Eliminar Usuario"
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
        {userToDelete && (
          <div>
            <p className="mb-1 text-muted">
              ¿Estás seguro de que deseas eliminar al usuario{" "}
              <strong>
                {userToDelete.name} {userToDelete.lastName}
              </strong>
              ?
            </p>
          </div>
        )}
      </Modal>

      {/* Modal Crear Usuario */}
      <Modal
        isOpen={isAddOpen}
        title="Añadir Nuevo Usuario"
        onClose={closeAddModal}
        footer={
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={closeAddModal}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn tabu-btn-primary px-4"
              onClick={handleConfirmAdd}
              // Desactiva si faltan campos obligatorios
              disabled={
                !formData.name ||
                !formData.lastName ||
                !formData.email ||
                !formData.password
              }
            >
              Registrar Usuario
            </button>
          </>
        }
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-medium">Nombre *</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. Ana"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Apellidos *</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Ej. Gómez"
            />
          </div>
          <div className="col-12">
            <label className="form-label fw-medium">Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Contraseña *</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 8 caracteres"
            />
            <div className="form-text" style={{ fontSize: "0.8rem" }}>
              Debe incluir una mayúscula y un número.
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Rol Asignado *</label>
            <select
              className="form-select"
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
            >
              <option value={1}>ADMIN</option>
              <option value={2}>CREATOR</option>
              <option value={3}>USER</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label fw-medium">
              Centro Educativo (Opcional)
            </label>
            <input
              type="text"
              className="form-control"
              name="educationalCenter"
              value={formData.educationalCenter}
              onChange={handleInputChange}
              placeholder="Ej. IES Gregorio Prieto"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
