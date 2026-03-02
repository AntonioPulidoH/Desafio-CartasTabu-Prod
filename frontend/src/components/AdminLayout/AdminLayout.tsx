import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { StatCard } from "../StatCard/StatCard";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { useUsers } from "../UserTable/hooks/useUsers";
import { useThemes } from "../ThemeTable/hooks/useThemes";

export const AdminLayout = () => {
  const { users, loading: loadingUsers } = useUsers();
  const { themes, loading: loadingThemes } = useThemes();

  // Total Cartas
  const totalCards = themes.reduce(
    (sum, theme) => sum + (theme._count?.cards || 0),
    0,
  );

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      {/* Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

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
