import { Users, Globe, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar d-flex flex-column flex-shrink-0 p-3 border-end">
      <div className="mb-4 px-2"> Logo </div>

      <ul className="nav flex-column mb-auto gap-2">
        <li className="nav-item">
          <NavLink
            to="/admin/usuarios"
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
            className={({ isActive }) =>
              `tabu-menu-item d-flex align-items-center w-100 text-start text-decoration-none ${isActive ? "is-active" : ""}`
            }
          >
            <Globe className="me-3" size={20} />
            Gestión de Temáticas
          </NavLink>
        </li>

        {/* <li className="nav-item">
          <NavLink
            to="/admin/configuracion"
            className={({ isActive }) =>
              `tabu-menu-item d-flex align-items-center w-100 text-start text-decoration-none ${isActive ? "is-active" : ""}`
            }
          >
            <Settings className="me-3" size={20} />
            Configuración
          </NavLink>
        </li> */}
      </ul>
    </aside>
  );
};
