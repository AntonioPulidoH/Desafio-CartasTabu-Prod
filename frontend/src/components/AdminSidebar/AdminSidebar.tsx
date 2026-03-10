import { Users, Globe, Menu, X, LayoutGrid } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAdminSidebar } from "./hooks/useAdminSidebar";
import "./AdminSidebar.css";

export const AdminSidebar = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useAdminSidebar();

  return (
    <aside className="admin-sidebar d-flex flex-column flex-shrink-0 border-end">
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-center p-3 d-md-none w-100">
        <button
          className="btn btn-sm text-white"
          onClick={toggleMenu}
          style={{ border: "none", background: "transparent", padding: 0 }}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú */}
      <div
        className={`p-3 flex-column w-100 ${isMenuOpen ? "d-flex" : "d-none d-md-flex"}`}
      >
        <ul className="nav flex-column mb-auto gap-2">
          <li className="nav-item">
            <NavLink
              to="/admin/usuarios"
              onClick={closeMenu}
              className={({ isActive }) =>
                `tabu-menu-item d-flex align-items-center w-100 text-start text-decoration-none ${isActive ? "is-active" : ""}`
              }
            >
              <Users className="me-3" size={20} />
              Gestión de Usuarios
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/tematicas"
              onClick={closeMenu}
              className={({ isActive }) =>
                `tabu-menu-item d-flex align-items-center w-100 text-start text-decoration-none ${isActive ? "is-active" : ""}`
              }
            >
              <Globe className="me-3" size={20} />
              Gestión de Temáticas
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                `tabu-menu-item d-flex align-items-center w-100 text-start text-decoration-none ${isActive ? "is-active" : ""}`
              }
            >
              <LayoutGrid className="me-3" size={20} />
              Colecciones
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
