type CardProps = {
    title: string
    children: React.ReactNode
    footer?: React.ReactNode
}

export default function Card({title, children, footer}: CardProps) {
    return (
        <div className="profile-card">
            <h3>{title}</h3>

            <div className="card-content">
                {children}
            </div>

            {footer && (
                <div className="card-footer">
                    {footer}
                </div>
            )}
        </div>
    )
}