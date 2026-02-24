import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { StatCard } from "../StatCard/StatCard";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      {/* Columna izquierda*/}
      <AdminSidebar />

      {/* Columna derecha */}
      <main
        className="flex-grow-1 p-3 p-md-4 w-100"
        style={{ overflowX: "hidden" }}
      >
        <div className="container-fluid max-w-7xl mx-auto px-0">
          <h2 className="mb-4 fw-bold">Dashboard General</h2>

          {/* StatCards */}
          <div className="row g-4 mb-5">
            <div className="col-12 col-md-4">
              <StatCard title="Usuarios Totales:" value="150" />
            </div>
            <div className="col-12 col-md-4">
              <StatCard title="Tarjetas Generadas:" value="1,200" />
            </div>
            <div className="col-12 col-md-4">
              <StatCard title="Temas Activos:" value="25" />
            </div>
          </div>

          {/* Tablas Dinámicas */}
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
