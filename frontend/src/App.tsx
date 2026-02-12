import { RouterProvider } from "react-router-dom";
import { appRouter } from "./router/app.router";

export default function App() {
  return <RouterProvider router={appRouter}></RouterProvider>
}
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
