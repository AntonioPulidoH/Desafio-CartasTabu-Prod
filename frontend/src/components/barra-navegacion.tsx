export function BarraNavegacion() {
  return (
    <nav className="navbar navbar-expand-lg barra-nav">
      <div className="container">
        <a className="navbar-brand" href="#inicio">
          <span className="icono-logo">
            {/*Aquí tenemos que poner el log*/}
          </span>
          {"Tabu-Studio"}
        </a>

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
              <a className="nav-link" href="#caracteristicas">
                Reglas del Juego
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#empezar">
                Crear
              </a>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button type="button" className="boton-acento w-100">
                Iniciar Sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
