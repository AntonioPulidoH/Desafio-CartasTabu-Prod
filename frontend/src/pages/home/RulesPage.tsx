import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";

export default function Rules() {
    return (
        <>
            <BarraNavegacion />

            <main className="container py-5">
                <div className="text-center mb-5 mt-5">
                    <h1 className="display-4 fw-bold mb-3">Reglas del Juego</h1>
                    <h2 className="h3 titulo-tabu mb-4">Tabú-Studio</h2>
                </div>

                <section className="mb-5">
                    <h3 className="h4 fw-bold mb-4 border-bottom pb-2">
                        🎮 Reglas Oficiales
                    </h3>

                    <ol className="list-decimal list-inside fs-5 lh-lg">
                        <li className="mb-4">
                            Forma 2 equipos con el mismo número de jugadores
                        </li>

                        <li className="mb-4">
                            Cada equipo elige un representante que coge 5 tarjetas
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>Un jugador del equipo contrario actúa de vigilante</li>
                                <li>1 minuto máximo por turno</li>
                            </ul>
                        </li>

                        <li className="mb-4">
                            El representante explica la palabra sin:
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>Decir la palabra objetivo</li>
                                <li>Usar palabras prohibidas (lista roja)</li>
                            </ul>
                        </li>

                        <li className="mb-4">
                            Si el equipo adivina:
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>+1 tarjeta/punto</li>
                                <li>Pasa a la siguiente tarjeta</li>
                            </ul>
                        </li>

                        <li className="mb-4">
                            Si el vigilante toca el timbre:
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>Palabra prohibida detectada</li>
                                <li>Carta descartada (-1 punto)</li>
                            </ul>
                        </li>

                        <li className="mb-4">
                            Al acabar el minuto, se cuentan tarjetas netas
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>Pasa turno al siguiente equipo</li>
                            </ul>
                        </li>

                        <li>
                            Gana el primer equipo que llegue a <strong>25 puntos</strong>
                        </li>
                    </ol>
                </section>

                <section className="mb-5">
                    <h3 className="h4 fw-bold mb-4 border-bottom pb-2">
                        ⚡ Modo Blitz (Rápido)
                    </h3>

                    <ol className="list-decimal list-inside fs-5 lh-lg">
                        <li className="mb-4">
                            Cada equipo coge <strong>UNA tarjeta</strong> por turno
                        </li>

                        <li className="mb-4">
                            El vigilante controla:
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>Palabra prohibida = TURNO TERMINADO inmediatamente</li>
                                <li>Sin segunda oportunidad</li>
                            </ul>
                        </li>

                        <li className="mb-4">
                            Puntuación:
                            <ul className="list-disc list-inside mt-3 mb-0 ms-5 fs-6">
                                <li>+1 por acierto</li>
                                <li>-1 por penalización</li>
                            </ul>
                        </li>

                        <li>
                            Gana el primer equipo en llegar a <strong>15 puntos</strong>
                        </li>
                    </ol>
                </section>

                <section>
                    <h3 className="h4 fw-bold mb-4 border-bottom pb-2">
                        📊 Puntuación Final
                    </h3>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <h4 className="card-title text-primary fw-bold">Oficial</h4>
                                    <div className="display-6 fw-bold text-primary mb-2">25</div>
                                    <p className="mb-0">Puntos para ganar</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center p-4">
                                    <h4 className="card-title text-danger fw-bold">Blitz</h4>
                                    <div className="display-6 fw-bold text-danger mb-2">15</div>
                                    <p className="mb-0">Puntos para ganar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-5">
                    <a
                        href="/Tabu-Studio - REGLAS DEL JUEGO.pdf"
                        className="boton-acento fs-4 px-5 py-4 fw-bold shadow-lg d-inline-block text-decoration-none"
                        download="Tabu-Studio - REGLAS DEL JUEGO.pdf"
                    >
                        📥 Descargar Reglas (PDF)
                    </a>
                </div>

            </main>

            <Footer />
        </>
    )
}
