import { Footer } from './components/footer'
import { BarraNavegacion } from './components/barra-navegacion'
import { BannerPrincipal } from './components/banner-principal'
import { CarruselCaracteristicas } from './components/carousel-caracteristicas'
import { SeccionEmpezar } from './components/seccion-Empezar'

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
