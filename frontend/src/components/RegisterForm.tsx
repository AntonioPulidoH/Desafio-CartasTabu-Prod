import { useState } from 'react'
import { register } from '../api/register'
import { GoogleLogin } from '@react-oauth/google'
import type { CredentialResponse } from '@react-oauth/google'

type RegisterFormProps = {
    onSuccess?: (role: string) => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [educationalCenter, setEducationalCenter] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setError('')

        if (!isValidEmail(email)) {
            setError('El email no tiene un formato válido.')
            return
        }

        if (!isValidPassword(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
            return
        }

        if (!name || !lastName) {
            setError('Faltan datos obligatorios.')
            return
        }

        setLoading(true)

        try {
            const data = await register({
                name,
                lastName,
                email,
                password,
                educationalCenter: educationalCenter || null,
            })

            if (data?.access_token) {
                sessionStorage.setItem('access_token', data.access_token)
                if (onSuccess) onSuccess('USER')
            } else {
                throw new Error('Token no recibido del servidor')
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error desconocido';
            switch (message) {
                case 'EMAIL_INVALIDO':
                    setError('El email no tiene un formato válido.')
                    break
                case 'EMAIL_YA_REGISTRADO':
                    setError('Este email ya está registrado.')
                    break
                case 'PASSWORD_INVALIDA':
                    setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.')
                    break
                case 'DATOS_OBLIGATORIOS':
                    setError('Faltan datos obligatorios.')
                    break
                default:
                    setError('No se ha podido registrar el usuario.')
            }
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
                sessionStorage.setItem('access_token', data.access_token)
                if (onSuccess) onSuccess('USER')
            } else {
                setError('No se pudo completar el registro con Google.')
            }
        } catch {
            setError('Error de conexión con el servidor.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card auth-card border-0 shadow-sm">
                            <div className="card-body p-5">
                                <h2 className="card-title mb-4 text-center fw-bold text-white">Registro</h2>

                                <form className="auth-form" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nombre"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Apellidos"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            type="password"
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Centro educativo (opcional)"
                                            value={educationalCenter}
                                            onChange={(e) => setEducationalCenter(e.target.value)}
                                        />
                                    </div>

                                    {error && <p className="text-danger text-center fw-bold">{error}</p>}

                                    <button className="btn btn-auth-submit w-100 py-2" type="submit" disabled={loading}>
                                        {loading ? 'Registrando...' : 'Registrarse'}
                                    </button>

                                    <div className='d-flex align-items-center my-4'>
                                        <hr className='flex-grow-1 border-light' style={{ opacity: 1 }} />
                                        <span className='mx-3 fw-bold text-white'>o</span>
                                        <hr className='flex-grow-1 border-light' style={{ opacity: 1 }} />
                                    </div>

                                    <div className='d-flex justify-content-center mb-4'>
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => setError('Fallo en el registro')}
                                            theme='filled_blue'
                                            shape='pill'
                                            text='signup_with'
                                            width="100%"
                                        />
                                    </div>

                                    <p className="text-center mt-3 mb-0 text-white">
                                        ¿Ya tienes una cuenta? <a href="/auth" className="fw-bold">Inicia Sesión</a>
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