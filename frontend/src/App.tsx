import { Footer } from './components/footer'
import { BarraNavegacion } from './components/barra-navegacion'
import { BannerPrincipal } from './components/banner-principal'
import { CarruselCaracteristicas } from './components/carousel-caracteristicas'
import { SeccionCta } from './components/seccion-cta'

function App() {


  return (
    <>
      <BarraNavegacion/>
      <BannerPrincipal/>
      <CarruselCaracteristicas />
      <SeccionCta/>
      <Footer />
    </>
  )
}

export default App
