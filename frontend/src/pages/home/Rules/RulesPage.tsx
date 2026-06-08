import { BarraNavegacion } from "../../../components/barra-navegacion";
import { Footer } from "../../../components/footer";
import './rules.css'

export default function Rules() {
    return (
        <>
            <BarraNavegacion />

            <main className="rules-container py-5">
                <div className="rules-hero">
                    <h2 className="display-4 fw-bold mb-3 text-white">INSTRUCCIONES</h2>
                </div>

                <section className="rules-section mb-5">
                    <div className="rules-grid">
                        <div className="rules-card rules-card-wide">
                            <div className="rules-number">01</div>
                            <h4>Objetivo del juego</h4>

                            <p>
                                Conseguir adivinar la mayor cantidad de palabras antes de que termine el tiempo.
                            </p>
                        </div>

                        <div className="rules-card">
                            <div className="rules-number">02</div>
                            <h4>Preparación</h4>

                            <ul>
                                <li>Imprime y recorta una colección</li>
                                <li>Forma 2 equipos. Mínimo 4 jugadores</li>
                                <li>Baraja las cartas</li>
                                <li>Coloca el mazo en el centro de la mesa</li>
                            </ul>
                        </div>

                        <div className="rules-card">
                            <div className="rules-number">03</div>
                            <h4>Orden de juego</h4>

                            <ul>
                                <li>Al principio de la primera ronda elegiremos a los "explicadores", que será el miembro más joven de cada equipo. El resto de jugadores serán adivinadores de su equipo</li>
                                <li>Comenzará el primer turno el "explicador" más joven de los dos</li>
                                <li>Cada turno dura 2 minutos</li>
                                <li>El explicador describe la palabra</li>
                                <li>Los adivinadores intentarán adivinar la mayor cantidad de palabras dentro del tiempo (se pueden hacer intentos ilimitados)</li>
                                <li>Si el tiempo no se ha acabado, cada vez que se acierte una palabra, el explicador cogerá una carta nueva</li>
                                <li>Cuando se acabe el tiempo, comenzará el turno del otro equipo, que jugarán igual hasta que se acabe su tiempo</li>
                                <li>Al final de la ronda los equipos puntúan</li>
                                <li>El rol del explicador rota en sentido de las agujas del reloj</li>
                                <li>Comienza otra ronda</li>
                            </ul>
                        </div>

                        <div className="rules-card">
                            <div className="rules-number">04</div>
                            <h4>Normas del explicador</h4>

                            <ul>
                                <li>No puede decir la palabra exacta</li>
                                <li>No puede decir palabras que contengan partes de la misma</li>
                                <li>Tampoco puede decir las palabras prohibidas de la carta</li>
                                <li>No puede usar traducciones</li>
                            </ul>
                        </div>

                        <div className="rules-card">
                            <div className="rules-number">05</div>
                            <h4>Puntuación</h4>

                            <ul>
                                <li>+1 punto por cada palabra acertada dentro el tiempo</li>
                                <li>Si falla o acaba el tiempo 0 puntos</li>
                                <li>Después juega el otro equipo</li>
                            </ul>
                        </div>

                        <div className="rules-card rules-highlight-card rules-card-wide">
                            <h4>¿Qué palabra se esconde?</h4>

                            <p className="mb-0">
                                Usa creatividad, rapidez y trabajo en equipo para descubrir
                                todas las palabras posibles antes de que termine el tiempo.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center mt-5">
                    <a
                        href="/DESBLOQUEALO-Reglas del juego.pdf"
                        className="boton-acento fs-4 px-5 py-4 fw-bold shadow-lg d-inline-block text-decoration-none"
                        download="Desbloquealo - REGLAS DEL JUEGO.pdf"
                    >
                        📥 Descargar Reglas (PDF)
                    </a>
                </div>

            </main>

            <Footer />
        </>
    )
}
