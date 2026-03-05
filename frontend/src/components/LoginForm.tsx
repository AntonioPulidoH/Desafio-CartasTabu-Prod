import { useState } from 'react';
import { login } from '../api/auth';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

type LoginFormProps = {
    onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await login({ email, password })
            sessionStorage.setItem('access_token', data.access_token)
            if (onSuccess) onSuccess()
        } catch {
            setError('Email o contraseña incorrectos.')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setError('')
        setLoading(true)
        try {
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_token: credentialResponse.credential }),
            })

            const data = await response.json()

            if (response.ok && data.access_token) {
                sessionStorage.setItem('access_token', data.access_token);
                if (onSuccess) onSuccess();
            } else {
                setError('No se pudo validar la cuenta de Google.')
            }
        } catch {
            setError('Error de conexión con el servidor.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='auth-container'>
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-lg-5'>
                        <div className='card auth-card border-0 shadow-sm '>
                            <div className='card-body p-5'>
                                <h2 className='card-title mb-4 text-center fw-bold text-white'>Iniciar Sesión</h2>
                                <form className='auth-form' onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <input
                                            className='form-control'
                                            type='email'
                                            placeholder='Introduce tu email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>

                                    <div className='mb-4'>
                                        <input
                                            className='form-control'
                                            type='password'
                                            placeholder='Introduce tu contraseña'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required />
                                    </div>

                                    {error && <p className='text-danger text-center fw-bold'>{error}</p>}

                                    <button className='btn btn-auth-submit w-100 py-2' type='submit' disabled={loading}>
                                        {loading ? 'Entrando...' : 'Entrar'}
                                    </button>

                                    <div className='d-flex align-items-center my-4'>
                                        <hr className='flex-grow-1 border-light' style={{ opacity: 1 }} />
                                        <span className='mx-3 fw-bold text-white'>o</span>
                                        <hr className='flex-grow-1 border-light' style={{ opacity: 1 }} />
                                    </div>

                                    <div className='d-flex justify-content-center mb-3'>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => setError('Fallo en la autenticación')}
                                            theme='filled_blue'
                                            shape='pill'
                                            width="100%"
                                        />
                                    </div>

                                    <p className='text-center mt-3 mb-0 text-white'>
                                        ¿Aún no tienes cuenta?{' '}
                                        <a href='/register' className='fw-bold'>Regístrate</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}