import { GraduationCap, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function BarraNavegacion() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");
  const userEmail = sessionStorage.getItem("user_email");

  // Función cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_role");
    sessionStorage.removeItem("user_email");

    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark barra-nav fixed-top border-bottom"
      style={{ borderColor: "var(--color-borde)" }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fs-5 fw-bold text-light"
          to="/"
        >
          <span className="icono-logo d-flex align-items-center justify-content-center">
            <GraduationCap size={20} />
          </span>
          Tabu-Studio
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Abrir menu de navegacion"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link small px-3 py-2" href="#caracteristicas">
                <button
                  type="button"
                  className="boton-acento w-100 d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3"
                  onClick={() => navigate("/rules")}
                >
                  Reglas del juego
                </button>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link small px-3 py-2"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  token ? navigate("/dashboard") : navigate("/auth");
                }}
              >
                Crear
              </a>
            </li>

            {token ? (
              // Usuario Logueado
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center">
                  <span className="nav-link text-light d-flex align-items-center gap-2 px-3 fw-medium">
                    <User size={18} />
                    {userEmail}
                  </span>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button
                    type="button"
                    className="btn btn-outline-light w-100 d-inline-flex align-items-center justify-content-center gap-2 px-3 py-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  type="button"
                  className="boton-acento w-100 d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3"
                  onClick={() => navigate("/auth")}
                >
                  Iniciar Sesion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
