import { useState } from 'react'
import { register } from '../api/register'

type RegisterFormProps = {
    onSuccess?: () => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [educationalCenter, setEducationalCenter] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Validaciones
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPassword = (password: string) =>
        /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) // 8 caracteres, mayúscula y número

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setError('')

        if (!isValidEmail(email)) {
        setError('El email no tiene un formato válido.')
        return
        }

        if (!isValidPassword(password)) {
        setError(
            'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
        )
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
        sessionStorage.setItem('access_token', data.access_token)
        sessionStorage.setItem('user_role', data.role)
        console.log(data)
        if (data.role === 'CREATOR') {
            if (onSuccess) onSuccess()
        } else{
            window.location.href = '/'
        }

        } catch (err: any) {
        switch (err.message) {
            case 'EMAIL_INVALIDO':
            setError('El email no tiene un formato válido.')
            break
            case 'EMAIL_YA_REGISTRADO':
            setError('Este email ya está registrado.')
            break
            case 'PASSWORD_INVALIDA':
            setError(
                'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.'
            )
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

    return (
        <div className="auth-container">
            <div className="container py-5">
                <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card auth-card border-0 shadow-sm">
                    <div className="card-body p-5">
                        <h2 className="card-title mb-4 text-center">Registro</h2>

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

                        {error && <p className="text-danger">{error}</p>}

                        <button
                            className="btn btn-auth-submit w-100 py-2"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>

                        <p className="text-center mt-3 mb-0">
                            Ya tienes una cuenta <a href="/auth">Inicia Sesión</a>
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
