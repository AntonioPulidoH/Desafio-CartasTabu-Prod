import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

export const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Columna izquierda */}
      <AdminSidebar />

      {/* Columna derecha */}
      <main
        className="flex-grow-1 p-4"
        style={{ backgroundColor: "var(--tabu-gray-bg)" }}
      >
        <h2>Panel Administrador</h2>
        <p>Tarjetas y tabla</p>
      </main>
    </div>
  );
};
