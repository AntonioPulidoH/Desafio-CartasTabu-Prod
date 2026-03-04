import './profile.css'
import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";

type Role = 'ADMIN' | 'CREADOR' | 'USUARIO'

const roleBadge: Record<Role, string> = {
    ADMIN: 'bg-danger',
    CREADOR: 'bg-primary',
    USUARIO: 'bg-secondary'
}

type UserProfile = {
    id: number
    name: string
    lastName: string
    email: string
    educationalCenter: string | null

    role: Role

    //mock temporal
    stats: {
        generatedCards: number,
        createdThemes: number
    }
}

//mock temporal
const rolePermissions = {
    ADMIN: {
        canGenerateCard: true,
        canCreateThemes: true,
        canManageUser: true
    },
    CREADOR: {
        canGenerateCard: true,
        canCreateThemes: true,
        canManageUser: false
    },
    USUARIO: {
        canGenerateCard: true,
        canCreateThemes: false,
        canManageUser: false
    }
        
}

export default function ProfilePage() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<UserProfile | null>(null)

    useEffect(() => {
        async function loadProfile() {
            const data = await getProfile()
            const formattedProfile: UserProfile = {
                id: data.id,
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                educationalCenter: data.educationalCenter,
                vocationalFamily: data.vocationalFamily.name,
                role: data.role.name as Role,

                //mock temporal
                stats: {
                    generatedCards: 12,
                    createdThemes: 3
                }
            }

            setProfile(formattedProfile)
        }
        loadProfile()
    }, [])

    if(!profile) return <p>Cargando perfil...</p>

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <div className="profile-container">
                <p>
                    Rol: 
                    <span className={`badge ${roleBadge[profile.role] ?? 'bg-dark'}`}>
                        {profile.role}
                    </span>
                </p>
                

                <div className="profile-grid">
                    <Card title="Información de perfil">
                        <p><strong>Nombre: </strong>{profile.name}</p>
                        <p><strong>Apellido: </strong>{profile.lastName}</p>
                        <p><strong>Email: </strong>{profile.email}</p>
                        <p><strong>Centro educativo: </strong>{profile.educationalCenter}</p>
                        <p><strong>Familia Profesional: </strong>{profile.}</p>
                    </Card>

                    <Card title="Permisos">
                        <p>{rolePermissions[profile.role].canGenerateCard ? '✔' : '✖'} Generar tarjetas</p>
                        <p>{rolePermissions[profile.role].canCreateThemes ? '✔' : '✖'} Generar temas</p>
                        <p>{rolePermissions[profile.role].canManageUser ? '✔' : '✖'} Gestionar usuarios</p>
                    </Card>

                    <Card title="Actividad" footer={
                            <button className="btn boton-acento" onClick={() => navigate('/collections')}>
                                Ver mis colecciones
                            </button>
                        }
                    >
                        <p>Tarjetas generadas: {profile.stats.generatedCards}</p>

                        {(profile.role === 'CREADOR' || profile.role === 'ADMIN') && (
                            <p>Temas creados: {profile.stats.createdThemes}</p>
                        )}
                    </Card>
                </div>
            </div>

            <Footer></Footer>
        </>
        
    )
}