import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";
import '../../styles/auth.css'
import RegisterForm from "../../components/RegisterForm";

export default function Register() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if(token) {
            navigate('/', {replace: true}) //redireccion temporal
        }
    }, [navigate])

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <main>
                <h1>Iniciar Sesión</h1>
                <RegisterForm onSuccess={() => navigate('/', {replace: true})}></RegisterForm>
            </main>

            <Footer></Footer>
        </>
    )
}