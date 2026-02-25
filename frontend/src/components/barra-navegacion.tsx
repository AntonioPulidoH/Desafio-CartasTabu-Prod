import { GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export function BarraNavegacion() {
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark barra-nav fixed-top border-bottom" style={{borderColor: 'var(--color-borde)'}}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2 fs-5 fw-bold text-light" to='/'>
          <span className="icono-logo d-flex align-items-center justify-content-center">
            {/*Aquí tenemos que poner el logo*/}
            <GraduationCap size={20} />
          </span >
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
                Reglas del Juego
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link small px-3 py-2" href="/dashboard">
                Crear
              </a>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button type="button" className="boton-acento w-100 d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3"
              onClick={() => navigate('/auth')}>
                Iniciar Sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
