import { Footer } from './components/footer'
import { BarraNavegacion } from './components/barra-navegacion'
import { BannerPrincipal } from './inicio/banner-principal'
import { CarruselCaracteristicas } from './inicio/carousel-caracteristicas'
import { SeccionEmpezar } from './inicio/seccion-Empezar'

function App() {


  return (
    <>
      <BarraNavegacion/>
      <BannerPrincipal/>
      <CarruselCaracteristicas />
      <SeccionEmpezar/>
      <Footer />
    </>
  )
}

export default App
