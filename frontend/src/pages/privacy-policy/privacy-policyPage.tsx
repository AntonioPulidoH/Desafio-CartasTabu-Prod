import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";
import "./privacy-policy.css";

export default function PrivacyPolicyPage() {
    return (
        <>
            <BarraNavegacion />

            <main className="privacy-container">
                <section className="privacy-hero">
                    <h1>Política de Privacidad</h1>
                </section>

                <section className="privacy-card">
                    <h2>1. Responsable del tratamiento</h2>
                    <p>
                        El responsable del tratamiento de los datos es Tabú-Studio,
                        plataforma destinada a la creación y gestión de tarjetas del juego
                        Tabú.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>2. Datos que recopilamos</h2>

                    <ul>
                        <li>Nombre y apellidos</li>
                        <li>Nombre de usuario</li>
                        <li>Contraseña cifrada</li>
                        <li>Centro educativo</li>
                        <li>Datos de uso dentro de la plataforma</li>
                    </ul>

                    <p className="privacy-highlight">
                        Tabú-Studio no almacena direcciones de correo electrónico.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>3. Finalidad de los datos</h2>

                    <p>Los datos recopilados se utilizan para:</p>

                    <ul>
                        <li>Gestionar cuentas de usuario</li>
                        <li>Permitir el acceso seguro a la plataforma</li>
                        <li>Administrar colecciones y tarjetas</li>
                        <li>Mejorar la experiencia de usuario</li>
                        <li>Garantizar la seguridad del sistema</li>
                    </ul>
                </section>

                <section className="privacy-card">
                    <h2>4. Conservación de datos</h2>

                    <p>
                        Los datos se conservarán mientras la cuenta permanezca activa o
                        hasta que el usuario solicite su eliminación.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>5. Seguridad</h2>

                    <p>
                        Las contraseñas se almacenan cifradas y se aplican medidas de
                        seguridad para proteger la información de accesos no autorizados.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>6. Derechos del usuario</h2>

                    <p>Los usuarios pueden solicitar:</p>

                    <ul>
                        <li>Acceso a sus datos</li>
                        <li>Rectificación de información incorrecta</li>
                        <li>Eliminación de su cuenta</li>
                        <li>Limitación del tratamiento de sus datos</li>
                    </ul>
                </section>

                <section className="privacy-card">
                    <h2>7. Cookies y almacenamiento local</h2>

                    <p>
                        Tabú-Studio puede utilizar almacenamiento local del navegador para
                        mantener la sesión iniciada y mejorar el funcionamiento de la
                        plataforma.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>8. Cambios en esta política</h2>

                    <p>
                        Esta política podrá actualizarse para adaptarse a cambios legales o
                        mejoras en la plataforma.
                    </p>
                </section>

                <section className="privacy-card">
                    <h2>9. Contacto</h2>

                    <p>
                        Si tienes dudas relacionadas con privacidad o protección de datos,
                        puedes contactar con el equipo responsable de Tabú-Studio.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}