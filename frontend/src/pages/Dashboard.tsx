import { Footer } from "../components/footer"
import { BarraNavegacion } from "../components/barra-navegacion"
import TabuDashboard from "../components/dashboard/layout/dashboardLayout"

export default function DashboardPage() {
    return (
        <>
            <BarraNavegacion />
            <TabuDashboard/>
            <Footer />
        </>
    )
}