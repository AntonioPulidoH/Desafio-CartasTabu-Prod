
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="footer-marca-logo">
              <span className="icono-logo">
                {/*Aquí iría el logo*/}
              </span>
              <span>Tabu-Studio</span>
            </div>
            <p className="footer-descripcion">
              La herramienta definitiva para crear tarjetas del juego del Tabu
              personalizadas y listas para imprimir.
            </p>
          </div>


          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-titulo-seccion">Plataforma</h4>
            <ul className="footer-enlaces">
              <li>
                <a href="#caracteristicas">Características</a>
              </li>
              <li>
                <a href="#empezar">Empezar</a>
              </li>
              <li>
                <a href="#">Documentación</a>
              </li>
            </ul>
          </div>

 
          <div className="col-md-4">
            <h4 className="footer-titulo-seccion">Legal</h4>
            <ul className="footer-enlaces">
              <li>
                <a href="#">Privacidad</a>
              </li>
              <li>
                <a href="#">Términos de uso</a>
              </li>
              <li>
                <a href="#">Contacto</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-inferior">
          <p>{"© 2026 Tabu-Studio. Todos los derechos reservados."}</p>
        </div>
      </div>
    </footer>
  )
}
