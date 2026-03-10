import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { StatCard } from "../StatCard/StatCard";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useUsers } from "../UserTable/hooks/useUsers";
import { useThemes } from "../ThemeTable/hooks/useThemes";
import { BarraNavegacion } from "../barra-navegacion";
import "./AdminLayout.css";

export const AdminLayout = () => {
  const { users, loading: loadingUsers } = useUsers();
  const { themes, loading: loadingThemes } = useThemes();

  // Total Cartas
  const totalCards = themes.reduce(
    (sum, theme) => sum + (theme._count?.cards || 0),
    0,
  );

  return (
    <div className="d-flex flex-column flex-md-row admin-layout-wrapper">
      <BarraNavegacion />

      {/* Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Columna izquierda*/}
      <AdminSidebar />

      {/* Columna derecha */}
      <main className="flex-grow-1 p-3 p-md-4 admin-layout-main">
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          {/* StatCards */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <StatCard
                title="Usuarios Totales:"
                value={loadingUsers ? "..." : users.length}
              />
            </div>
            <div className="col-12 col-md-4">
              <StatCard
                title="Tarjetas Generadas:"
                value={loadingThemes ? "..." : totalCards}
              />
            </div>
            <div className="col-12 col-md-4">
              <StatCard
                title="Temas Totales:"
                value={loadingThemes ? "..." : themes.length}
              />
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
