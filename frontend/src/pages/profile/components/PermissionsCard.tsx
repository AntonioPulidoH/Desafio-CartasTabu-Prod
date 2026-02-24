export default function PermissionsCard({permissions}: any) {
    return (
        <div className="profile-card">
            <h3>Permisos</h3>
            <p>{permissions.canGenerateCards ? '✔' : '✖'} Generar tarjetas</p>
            <p>{permissions.canCreateThemes ? '✔' : '✖'} Generar temas</p>
            <p>{permissions.canManageUsers ? '✔' : '✖'} Gestionar usuarios</p>
        </div>
    )
}