import { useState } from "react";
import type { UserProfile } from "../types";

export default function ProfileInfoCard({user}: {user: UserProfile}) {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(user.name)
    const [lastName, setLastName] = useState(user.lastName)
    const [center, setCenter] = useState(user.educationalCenter || '')

    return (
        <div className="profile-card">
            <h3>Información personal</h3>

            {!editing ? (
                <>
                    <p><strong>Nombre: </strong>{name}</p>
                    <p><strong>Apellido: </strong>{lastName}</p>
                    <p><strong>Centro: </strong>{center}</p>
                </>
            ) : (
                <>
                    <input value={name} onChange={e => setName(e.target.value)}></input>
                    <input value={lastName} onChange={e => setLastName(e.target.value)}></input>
                    <input value={center} onChange={e => setCenter(e.target.value)}></input>

                    <div>
                        <button onClick={() => setEditing(false)}>Guardar</button>
                        <button onClick={() => setEditing(false)}>Cancelar</button>
                    </div>
                </>
            )}
        </div>
    )
}