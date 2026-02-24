export default function ActivityCard({stats, role}: any) {
    return (
        <div className="profile-card">
            <h3>Actividad</h3>
            <p>Tarjetas generadas: {stats.generatedCards}</p>

            {(role === 'CREADOR' || role === 'ADMIN') && (
                <p>Temas creados: {stats.createdThemes}</p>
            )}
        </div>
    )
}