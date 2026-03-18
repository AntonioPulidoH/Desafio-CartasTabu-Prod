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
    const [email, setEmail] = useState(profile.email)
    const [educationalCenter, setEducationalCenter] = useState(profile.educationalCenter)
    const [vocationalFamilyId, setVocationalFamilyId] = useState<number | null>(null)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [families, setFamilies] = useState<VocationalFamily[]>([])

    useEffect(() => {
        async function loadFamilies() {
            const data = await getVocationalFamilies()
            setFamilies(data)
        }
        loadFamilies()
    }, [])

    async function handleSubmit() {
        if(password && password !== confirmPassword) {
            toast.error('La constraseña debe coincidir')
            return
        }

        try {
            await updateProfile({
                email, 
                password: password || undefined, 
                educationalCenter, 
                vocationalFamilyId
            })

            toast.success('Perfil actualizado correctamente.')
            onUpdated()
            onClose()
        } catch {
            toast.error('Error al actualizar el perfil.')
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
                    <button className="btn boton-acento" onClick={handleSubmit}>Guardar cambios</button>
                </>
            }
        >
            <div className="d-flex flex-column gap-4 edit-profile-form">
                <div>
                    <h6 className="fw-bold mb-3">
                        Datos personales (opcional)
                    </h6>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                        className="form-control" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nuevo email"></input>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Centro educativo</label>
                        <input 
                        className="form-control" 
                        value={educationalCenter ?? ''} 
                        onChange={(e) => setEducationalCenter(e.target.value)}
                        placeholder="Nuevo centro educativo"></input>
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
                    <h6 className="fw-bold mb-3 ">
                        Cambiar contraseña (opcional)
                    </h6>

                    <div className="mb-3">
                        <label className="form-label">Nueva contraseña</label>
                        <input 
                        className="form-control" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Dejar vacío para no cambiar"></input>
                    </div>

                    <div className="mb-1">
                        <label className="form-label">Confirmar contraseña</label>
                        <input 
                        className="form-control" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repetir contraseña"></input>
                    </div>
                </div>
            </div>
        </Modal>
    )
}