import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { StatCard } from "../StatCard/StatCard";
import { UserTable } from "../UserTable/UserTable";

export const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", width: "100vw" }}>
      {/* Columna izquierda*/}
      <AdminSidebar />

      {/* Columna derecha */}
      <main className="flex-grow-1 p-4">
        <div className="container-fluid max-w-7xl mx-auto">
          <h2 className="mb-4">Dashboard General</h2>

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

          {/* Tabla Usuarios */}
          <div id="table-placeholder">
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  );
};
