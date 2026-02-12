import { ArrowRight } from "lucide-react"

export function SeccionEmpezar() {
  return (
    <section id="empezar" className="py-5 py-lg-6">
      <div className="container">
        <div className="empezar-contenedor">
          <div className="empezar-glow-1" />
          <div className="empezar-glow-2" />

          <div className="empezar-interior position-relative z-2 d-flex flex-column align-items-center gap-4 p-5 text-center" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
            <h2 className="empezar-titulo display-4 fw-bold" style={{fontSize: 'clamp(2rem, 5vw, 3rem)'}}>
              {"Empieza a crear tus tarjetas ahora"}
            </h2>
            <p className="empezar-descripcion mb-0" style={{maxWidth: '480px', color: 'var(--color-texto-suave)'}}>
              Registrate gratis y accede a cientos de temas. Personaliza,
              genera e imprime tus propios mazos de Tabú en minutos.
            </p>
            <button type="button" className="btn boton-acento d-inline-flex align-items-center gap-2 fs-5 fw-bold" style={{padding: '16px 36px'}}>
              Empezar ahora
              <ArrowRight size={20} />{/*Símbolo de flecha*/}
            </button>
            <p className="empezar-nota small mb-0" style={{color: 'var(--color-texto-suave)'}}>
              Sin tarjeta de crédito. Gratis para siempre.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
