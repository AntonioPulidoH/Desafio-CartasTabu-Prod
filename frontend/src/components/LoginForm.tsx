import { useState } from 'react';
import { login } from '../api/auth';

type LoginFormProps = {
    onSuccess?: () => void
}

export default function LoginForm({onSuccess}: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await login({email, password})

            localStorage.setItem('access_token', data.access_token)
            if(onSuccess) onSuccess()
        } catch (error) {
            setError('Email o contraseña incorrectos.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Iniciar Sesión</h2>
            </div>

            <div>
                <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>
            </div>

            <div>
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required>
                </input>
            </div>

            {error && <p>{error}</p>}

            <button type='submit' disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}