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

        if(token) {
            navigate('/profile', {replace: true})
        }
    }, [navigate])

    const handleRegisterSuccess = (role: string) => {
        if(role === 'ADMIN') {
            navigate('/admin', {replace: true})
        } else {
            navigate('/profile', {replace: true})
        }
    }

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <main>
                <h1>Iniciar Sesión</h1>
                <RegisterForm onSuccess={handleRegisterSuccess}></RegisterForm>
            </main>

            <Footer></Footer>
        </>
    )
}