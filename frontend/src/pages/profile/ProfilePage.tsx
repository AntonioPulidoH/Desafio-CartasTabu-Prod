import type { UserProfile } from "./types";
import ProfileHeader from './components/ProfileHeader'
import ProfileInfoCard from './components/ProfileInfoCard'
import PermissionsCard from './components/PermissionsCard'
import ActivityCard from './components/ActivityCard'
import PreferencesCard from './components/PreferencesCard'
import './profile.css'
import { BarraNavegacion } from "../../components/barra-navegacion";
import { Footer } from "../../components/footer";

const mockProfile: UserProfile = {
    id: 1,
    name: 'Noelia',
    lastName: 'Barrionuevo',
    email: 'noe@email.com',
    role: 'CREADOR',
    permissions: {
        canGenerateCard: true,
        canCreateThemes: true,
        canManageUser: false
    },
    stats: {
        generatedCards: 12,
        createdThemes: 3
    },
    preferences: {
        defaultLanguage: 'ES',
        defaultTabuWords: 5,
        defaultCardsNumber: 20,
        defaultPrintFormat: 'A4'
    }
}

export default function ProfilePage() {
    const profile = mockProfile

    return (
        <>
            <BarraNavegacion></BarraNavegacion>

            <div className="profile-container">
                <ProfileHeader user={profile}></ProfileHeader>

                <div className="profile-grid">
                    <ProfileInfoCard user={profile}></ProfileInfoCard>
                    <PermissionsCard permissions={profile.permissions}></PermissionsCard>
                    <ActivityCard stats={profile.stats} role={profile.role}></ActivityCard>
                    <PreferencesCard preferences={profile.preferences}></PreferencesCard>
                </div>
            </div>

            <Footer></Footer>
        </>
        
    )
}