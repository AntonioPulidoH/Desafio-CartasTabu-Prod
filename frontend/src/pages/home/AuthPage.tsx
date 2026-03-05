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

        const role = sessionStorage.getItem('user_role')

    if (token && role === 'CREATOR') {
        navigate('/dashboard', { replace: true })
    } else if (token && role === 'USER') {
        window.location.href = '/'
    }
    }, [navigate])

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <main>
                <h1>Iniciar Sesión</h1>
                <LoginForm onSuccess={() => navigate('/dashboard', {replace: true})}></LoginForm>
            </main>

            <Footer></Footer>
        </>
    )
}