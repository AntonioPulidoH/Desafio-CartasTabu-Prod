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

            sessionStorage.setItem('access_token', data.access_token)
            sessionStorage.setItem('user_role', data.role)
            if(onSuccess) onSuccess()
        } catch (error) {
            setError('Email o contraseña incorrectos.')
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
                                <h2 className='card-title mb-4 text-center fw-bold'>Iniciar Sesión</h2>
                                <form className='auth-form' onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <input
                                            id='email'
                                            className='form-control'
                                            type='email'
                                            placeholder='Introduce tu email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required>
                                        </input>
                                    </div>

                                    <div className='mb-4'>
                                        <input
                                            id='password'
                                            className='form-control'
                                            type='password'
                                            placeholder='Introduce tu contraseña'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required>
                                        </input>
                                    </div>

                                    {error && <p className='text-danger'>{error}</p>}

                                    <button className='btn btn-auth-submit w-100 py-2' type='submit' disabled={loading}>
                                        {loading ? 'Entrando...' : 'Entrar'}
                                    </button>
                                    <p className='text-center mt-3 mb-0 '>
                                        ¿Aún no tienes cuenta?{' '}
                                        <a href='/register'>Regístrate</a>
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