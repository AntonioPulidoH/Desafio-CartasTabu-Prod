export function BannerPrincipal() {
  return (
    <section id="inicio" className="banner-principal position-relative d-flex align-items-center justify-content-center">
      <div className="banner-fondo-glow-1" />
      <div className="banner-fondo-glow-2" />

      <div className="banner-contenido position-relative z-2 text-center mx-auto px-3">
        <div className="badge etiqueta-badge d-inline-flex align-items-center gap-2 px-3 py-2 mb-4">
          <span className="small">Generador de tarjetas</span>
        </div>

        <h1 className="banner-titulo display-1 fw-bold">
          Tabu<span className="acento">-</span>Studio
        </h1>

        <p className="banner-descripcion mt-3 fs-5 mx-auto" style={{maxWidth: '600px', lineHeight: 1.7, color: 'var(--color-texto-suave)'}}>
          Crea, personaliza e imprime tarjetas del juego del Tabú adaptadas a
          cualquier temática. Desde el aula hasta la oficina, haz que aprender
          sea un juego.
        </p>

        <div className="banner-botones mt-4 d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
          <a href="#empezar" className="boton-acento d-inline-flex align-items-center gap-2 px-4 py-3">
            Generar Tarjetas 
          </a>
          <a href="#caracteristicas" className="boton-secundario d-inline-flex align-items-center gap-2 px-4 py-3">
            Descubrir más
          </a>
        </div>

        <div className="banner-estadisticas mt-5 pt-4 border-top" style={{borderColor: 'var(--color-borde)'}}>
          <div className="row text-center">
            <div className="col-4">
              <p className="estadistica-valor fs-1 fw-bold mb-1">100+</p>
              <p className="estadistica-etiqueta small mb-0" style={{color: 'var(--color-texto-suave)'}}>Temas disponibles</p>
            </div>
            <div className="col-4">
              <p className="estadistica-valor neutral fs-1 fw-bold mb-1">PDF</p>
              <p className="estadistica-etiqueta small mb-0" style={{color: 'var(--color-texto-suave)'}}>Listo para imprimir</p>
            </div>
            <div className="col-4">
              <p className="estadistica-valor fs-1 fw-bold mb-1">{"\u221E"}</p>
              <p className="estadistica-etiqueta small mb-0" style={{color: 'var(--color-texto-suave)'}}>Combinaciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
