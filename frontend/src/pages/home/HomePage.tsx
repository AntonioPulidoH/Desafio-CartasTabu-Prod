import { Footer } from '../../components/footer'
import { BarraNavegacion } from '../../components/barra-navegacion'
import { BannerPrincipal } from '../../inicio/banner-principal'
import { CarruselCaracteristicas } from '../../inicio/carousel-caracteristicas'
import { SeccionEmpezar } from '../../inicio/seccion-Empezar'
import { VideoDemo } from '../../inicio/video-demo'

export default function HomePage() {
    return (
        <>
        <BarraNavegacion/>
        <BannerPrincipal/>
        <CarruselCaracteristicas />
        <VideoDemo />
        <SeccionEmpezar/>
        <Footer />
        </>
    )
}