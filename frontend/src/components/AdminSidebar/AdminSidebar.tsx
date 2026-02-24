import { Home, Users, Globe, Settings } from 'lucide-react';
import './AdminSidebar.css';

export const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar d-flex flex-column flex-shrink-0 p-3 border-end">
      <div className="mb-4 px-2">
         {/* Logo */}
      </div>

      <ul className="nav flex-column mb-auto gap-2">
        <li className="nav-item">
          <button className="tabu-menu-item is-active d-flex align-items-center w-100 text-start">
            <Home className="me-3" size={20} />
            Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button className="tabu-menu-item d-flex align-items-center w-100 text-start">
            <Users className="me-3" size={20} />
            Gestión de Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button className="tabu-menu-item d-flex align-items-center w-100 text-start">
            <Globe className="me-3" size={20} />
            Temas Globales
          </button>
        </li>
        <li className="nav-item">
          <button className="tabu-menu-item d-flex align-items-center w-100 text-start">
            <Settings className="me-3" size={20} />
            Configuración
          </button>
        </li>
      </ul>
    </aside>
  );
}