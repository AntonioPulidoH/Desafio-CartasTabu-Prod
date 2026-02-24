import type { UserProfile } from "../types";

export default function ProfileHeader({user}: {user: UserProfile}) {
    return (
        <div>
            <h2>{user.name} {user.lastName}</h2>
            <p>{user.email}</p>

            <span className="{`profile-badge badge-${user.role}`}">
                {user.role}
            </span>
        </div>
    )
}