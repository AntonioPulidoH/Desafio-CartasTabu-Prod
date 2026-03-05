import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm";
import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";
import '../../styles/auth.css'

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('access_token')

        if(token) {
            navigate('/profile', {replace: true})
        }
    }, [navigate])

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <main>
                <h1>Iniciar Sesión</h1>
                <LoginForm onSuccess={() => navigate('/', {replace: true})}></LoginForm>
            </main>

            <Footer></Footer>
        </>
    )
}