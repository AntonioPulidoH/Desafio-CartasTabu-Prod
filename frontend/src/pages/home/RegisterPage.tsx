import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";
import '../../styles/auth.css'
import RegisterForm from "../../components/RegisterForm";

export default function Register() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('access_token')
        const role = sessionStorage.getItem('user_role')
        
        console.log(`rol: ${role}, token: ${token}`)

        if (token && role === 'CREATOR') {
            navigate('/dashboard', { replace: true })
        } else if (token && role === 'USER') {
            window.location.href = '/'
        }else if(token && role === 'ADMIN'){
            navigate('/dashboard', { replace: true })
        }
    }, [navigate])

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <main>
                <h1>Iniciar Sesión</h1>
                <RegisterForm onSuccess={() => navigate('/dashboard', {replace: true})}></RegisterForm>
            </main>

            <Footer></Footer>
        </>
    )
}