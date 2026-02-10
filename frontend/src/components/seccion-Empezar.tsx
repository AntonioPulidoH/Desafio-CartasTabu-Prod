import { ArrowRight } from "lucide-react"

export function SeccionEmpezar() {
  return (
    <section id="empezar" className="seccion-empezar">
      <div className="container">
        <div className="empezar-contenedor">
          <div className="empezar-glow-1" />
          <div className="empezar-glow-2" />

          <div className="empezar-interior">
            <h2 className="empezar-titulo">
              {"Empieza a crear tus tarjetas ahora"}
            </h2>
            <p className="empezar-descripcion">
              Registrate gratis y accede a cientos de temas. Personaliza,
              genera e imprime tus propios mazos de Tabú en minutos.
            </p>
            <button type="button" className="btn boton-acento grande">
              Empezar ahora
              <ArrowRight size={20} />{/*Símbolo de flecha*/}
            </button>
            <p className="empezar-nota">
              Sin tarjeta de crédito. Gratis para siempre.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}