import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal/Modal";
import { updateProfile } from "../../api/user";
import { getVocationalFamilies } from "../../api/vocationalFamilies";
import toast from "react-hot-toast";
import './EditProfileModal.css'

type VocationalFamily = {
    id: number
    name: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
    profile: any
    onUpdated: () => void
}

export const EditProfileModal = ({isOpen, onClose, profile, onUpdated}: Props) => {
    const [username, setUsername] = useState(profile?.username ?? "")
    const [educationalCenter, setEducationalCenter] = useState(profile?.educationalCenter ?? null)
    const [vocationalFamilyId, setVocationalFamilyId] = useState<number | null>(profile?.vocationalFamily?.id ?? null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [usernameError, setUsernameError] = useState<string | null>(null)

    const [families, setFamilies] = useState<VocationalFamily[]>([])

    useEffect(() => {
        async function loadFamilies() {
            const data = await getVocationalFamilies()
            setFamilies(data)
        }
        loadFamilies()
    }, [])

    useEffect(() => {
        setUsername(profile?.username ?? "");
        setEducationalCenter(profile?.educationalCenter ?? null);
        setVocationalFamilyId(profile?.vocationalFamily?.id ?? null);
    }, [profile, isOpen]);

    async function handleSubmit() {
        // Reset errors
        setErrorMessage(null)
        setUsernameError(null)

        // Validar username
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
        if (!username || !usernameRegex.test(username)) {
            setUsernameError('El nombre de usuario debe tener entre 3 y 20 caracteres; solo letras, números y guión bajo.')
            return
        }

        if(password && password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden')
            return
        }

        setLoading(true)
        try {
            await updateProfile({
                username,
                password: password || undefined,
                educationalCenter,
                vocationalFamilyId
            })

            toast.success('Perfil actualizado correctamente.')
            onUpdated()
            setTimeout(() => {
                onClose()
            }, 300)
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || 'Error al actualizar el perfil.'
            setErrorMessage(msg)
            toast.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            title="Editar perfil"
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    <button className="btn boton-acento" onClick={handleSubmit} disabled={loading}>{loading ? 'Guardando...' : 'Guardar cambios'}</button>
                </>
            }
        >
            <div className="d-flex flex-column gap-4 edit-profile-form">
                <div>
                    <h6 className="fw-bold mb-3">Datos personales (opcional)</h6>

                    <div className="mb-3">
                        <label className="form-label">Nombre de usuario</label>
                        <input
                            className="form-control"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nuevo nombre de usuario"
                        />
                        {usernameError && <div className="form-text text-danger">{usernameError}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Centro educativo</label>
                        <input
                            className="form-control"
                            value={educationalCenter ?? ''}
                            onChange={(e) => setEducationalCenter(e.target.value)}
                            placeholder="Nuevo centro educativo"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Familia profesional</label>
                        <select
                            className="form-select"
                            value={vocationalFamilyId ?? ''}
                            onChange={(e) => setVocationalFamilyId(Number(e.target.value))}
                        >
                            <option value=''>No cambiar</option>
                            {families.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <h6 className="fw-bold mb-3">Cambiar contraseña (opcional)</h6>

                    <div className="mb-3">
                        <label className="form-label">Nueva contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Dejar vacío para no cambiar"
                        />
                    </div>

                    <div className="mb-1">
                        <label className="form-label">Confirmar contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repetir contraseña"
                        />
                    </div>
                </div>

                {errorMessage && (
                    <div className="alert alert-danger mt-2" role="alert">
                        {errorMessage}
                    </div>
                )}

            </div>
        </Modal>
    )
}