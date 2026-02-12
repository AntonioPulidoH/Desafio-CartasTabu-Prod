import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../../components/LoginForm";

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if(token) {
            navigate('/principal', {replace: true}) //redireccion temporal
        }
    }, [navigate])

    return (
        <main>
            <h1>Iniciar Sesión</h1>
            <LoginForm onSuccess={() => navigate('/principal', {replace: true})}></LoginForm>
        </main>
    )
}