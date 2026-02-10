import {
  Layers,
  Printer,
  Users,
  Palette,
  BookOpen,
  Shield,
} from "lucide-react" //Todo esto es para los iconos de las tarjetas

{/*Estas características son provisionales, pero por ahora me parecían bien*/}

const caracteristicas = [
  {
    icono: Layers,
    titulo: "Temas personalizados",
    descripcion:
      "Crea temas a medida: educacion, empresa, ocio... cualquier contexto se adapta a tus tarjetas.",
  },
  {
    icono: Printer,
    titulo: "Impresion en PDF",
    descripcion:
      "Genera tarjetas listas para imprimir en formato PDF estandar, con diseno profesional.",
  },
  {
    icono: Users,
    titulo: "Roles y permisos",
    descripcion:
      "Sistema de usuarios con roles diferenciados: lectores, creadores y administradores.",
  },
  {
    icono: Palette,
    titulo: "Parametrizacion total",
    descripcion:
      "Elige numero de tarjetas, palabras tabu por tarjeta, idioma y formato de impresion.",
  },
  {
    icono: BookOpen,
    titulo: "Uso educativo",
    descripcion:
      "Ideal para profesores, formadores y dinamizadores que buscan materiales didacticos originales.",
  },
  {
    icono: Shield,
    titulo: "Escalable y seguro",
    descripcion:
      "Arquitectura preparada para crecer, con autenticacion segura y datos protegidos.",
  },
]

/* Agrupa las caracteristicas de 3 en 3 para cada slide del carousel */
function agruparEnSlides<T>(lista: T[], tamano: number): T[][] {
  const resultado: T[][] = []
  for (let i = 0; i < lista.length; i += tamano) {
    resultado.push(lista.slice(i, i + tamano))
  }
  return resultado
}

export function CarruselCaracteristicas() {
  const slides = agruparEnSlides(caracteristicas, 3)

  return (
    <section id="caracteristicas" className="seccion-caracteristicas">
      <div className="container">
        <div className="text-center mb-5">
          <p className="seccion-titulo-superior">Caracteristicas</p>
          <h2 className="seccion-titulo">
            {"Todo lo que necesitas para tus tarjetas"}
          </h2>
          <p className="seccion-subtitulo">
            Una plataforma completa para crear, gestionar y compartir mazos de
            Tabú adaptados a cualquier situación.
          </p>
        </div>

        <div
          id="carruselCaracteristicas"
          className="carousel slide"
          data-bs-ride="carousel"
        >

          <div className="carousel-indicators indicadores-carrusel">
            {slides.map((_, indice) => (
              <button
                key={indice}
                type="button"
                data-bs-target="#carruselCaracteristicas"
                data-bs-slide-to={indice}
                className={indice === 0 ? "active" : ""}
                aria-current={indice === 0 ? "true" : undefined}
                aria-label={`Slide ${indice + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {slides.map((grupo, indiceSlide) => (
              <div
                key={indiceSlide}
                className={`carousel-item  ${indiceSlide === 0 ? "active" : ""}`
              }data-bs-interval="3000"
              >
                <div className="row justify-content-center g-4 px-2">
                  {grupo.map((item) => (
                    <div key={item.titulo} className="col-12 col-md-6 col-lg-4">
                      <div className="tarjeta-caracteristica h-100">
                        <div className="tarjeta-icono">
                          <item.icono />
                        </div>
                        <h3 className="tarjeta-titulo">{item.titulo}</h3>
                        <p className="tarjeta-descripcion">
                          {item.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


          <button
            className="carousel-control-prev control-carrusel"
            type="button"
            data-bs-target="#carruselCaracteristicas"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next control-carrusel"
            type="button"
            data-bs-target="#carruselCaracteristicas"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
