export function Footer() {
  return (
    <footer className="footer-pagina border-top pt-5 pb-3" style={{borderColor: 'var(--color-borde)'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="footer-marca-logo d-flex align-items-center gap-2 mb-3">
              <span className="icono-logo d-flex align-items-center justify-content-center">
                {/*Aquí iría el logo*/}
              </span>
              <span className="fs-5 fw-bold">Tabu-Studio</span>
            </div>
            <p className="footer-descripcion small mb-0" style={{color: 'var(--color-texto-suave)', lineHeight: 1.6}}>
              La herramienta definitiva para crear tarjetas del juego del Tabu
              personalizadas y listas para imprimir.
            </p>
          </div>

          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="footer-titulo-seccion small fw-bold mb-3">Plataforma</h4>
            <ul className="footer-enlaces p-0 m-0 d-flex flex-column gap-2">
              <li>
                <a href="#caracteristicas" className="small">Características</a>
              </li>
              <li>
                <a href="#empezar" className="small">Empezar</a>
              </li>
              <li>
                <a href="#" className="small">Documentación</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4 className="footer-titulo-seccion small fw-bold mb-3">Legal</h4>
            <ul className="footer-enlaces p-0 m-0 d-flex flex-column gap-2">
              <li>
                <a href="/privacy-policy" className="small">Privacidad</a>
              </li>
              <li>
                <a href="#" className="small">Términos de uso</a>
              </li>
              <li>
                <a href="#" className="small">Contacto</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-inferior mt-5 pt-4 border-top text-center" style={{borderColor: 'var(--color-borde)'}}>
          <p className="small mb-0" style={{color: 'var(--color-texto-suave)'}}>
            {"© 2026 Tabu-Studio. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
