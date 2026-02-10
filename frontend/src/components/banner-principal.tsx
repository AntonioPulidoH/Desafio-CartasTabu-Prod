
export function BannerPrincipal() {
  return (
    <section id="inicio" className="banner-principal">

      <div className="banner-fondo-glow-1" />
      <div className="banner-fondo-glow-2" />

      <div className="banner-contenido">
        <div className="badge etiqueta-badge">
          <span>Generador de tarjetas</span>
        </div>

  
        <h1 className="banner-titulo">Tabu<span className="acento">-</span>Studio</h1>

        <p className="banner-descripcion">
          Crea, personaliza e imprime tarjetas del juego del Tabú adaptadas a
          cualquier temática. Desde el aula hasta la oficina, haz que aprender
          sea un juego.
        </p>

        <div className="banner-botones">
          <a href="#empezar" className="boton-acento">
            Generar Tarjetas 
          </a>
          <a href="#caracteristicas" className="boton-secundario">
            Descubrir más
          </a>
        </div>


        <div className="banner-estadisticas">
          <div className="row text-center">
            <div className="col-4">
              <p className="estadistica-valor">100+</p>
              <p className="estadistica-etiqueta">Temas disponibles</p>
            </div>
            <div className="col-4">
              <p className="estadistica-valor neutral">PDF</p>
              <p className="estadistica-etiqueta">Listo para imprimir</p>
            </div>
            <div className="col-4">
              <p className="estadistica-valor">{"\u221E"}</p>{/*Esto es para poner el símbolo del infinito*/}
              <p className="estadistica-etiqueta">Combinaciones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}