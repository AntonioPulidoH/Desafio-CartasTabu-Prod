import "./profile.css";
import { BarraNavegacion } from "../../components/barra-navegacion";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";
import { EditProfileModal } from "../../components/Profile/EditProfileModal";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";
import { getMyCardsCount } from "../../api/cards";
import { getMyThemesCount } from "../../api/themes";

type Role = "ADMIN" | "CREATOR" | "USER";

const roleBadge: Record<Role, string> = {
  ADMIN: "bg-danger",
  CREATOR: "bg-primary",
  USER: "bg-secondary",
};

type UserProfile = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  educationalCenter: string | null;
  vocationalFamily: string | null;

  role: Role;

  stats: {
    generatedCards: number;
    createdThemes: number;
  };
};

const rolePermissions = {
  ADMIN: {
    canGenerateCard: true,
    canCreateThemes: true,
    canManageUser: true,
  },
  CREATOR: {
    canGenerateCard: true,
    canCreateThemes: true,
    canManageUser: false,
  },
  USER: {
    canGenerateCard: true,
    canCreateThemes: false,
    canManageUser: false,
  },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();

        const cardsCount = await getMyCardsCount()
        const themesCount = await getMyThemesCount()

        const formattedProfile: UserProfile = {
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          educationalCenter: data.educationalCenter,
          vocationalFamily: data.vocationalFamily?.name ?? null,
          role: data.role.name as Role,

          stats: {
            generatedCards: cardsCount.total,
            createdThemes: themesCount.total,
          },
        };

        setProfile(formattedProfile);
      } catch (error) {
        console.error(error);
        navigate("/auth");
      }

      setTimeout(() => {
        setLoading(false)
      }, 400)
    }
    loadProfile();
  }, [navigate]);

  if (loading || !profile) {
    return (
      <div className="d-flex flex-column flex-md-row profile-layout-wrapper">
        <BarraNavegacion></BarraNavegacion>
        <AdminSidebar></AdminSidebar>

        <main className="flex-grow-1 p-4 p-md-5 profile-layout-main d-flex justify-content-center align-items-center">
          <div className="profile-loading">
            <div className="spinner-border text-light"></div>
            <p className="mt-3">Cargando perfil...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column flex-md-row profile-layout-wrapper">
      <BarraNavegacion />

      <AdminSidebar />

      {/* Contenedor principal */}
      <main className="flex-grow-1 p-4 p-md-5 profile-layout-main">
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          <div className="profile-title-row">
            <h2 className="profile-title">
              Mi Perfil
            </h2>
            <span
              className={`badge ${roleBadge[profile.role] ?? "bg-dark"} px-3 py-2 rounded-pill`}
            >
              {profile.role}
            </span>
          </div>

          <div className="profile-grid">
            <Card title="Información de perfil">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Nombre</span>
                  <strong>{profile.name}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Apellido</span>
                  <strong>{profile.lastName}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Centro educativo</span>
                  <strong>{profile.educationalCenter}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Familia profesional</span>
                  <strong>{profile.vocationalFamily}</strong>
                </li>
              </ul>

              <button
                className="btn btn-primary mt-3"
                onClick={() => setEditOpen(true)}
              >
                Editar perfil
              </button>
            </Card>

            <Card title="Permisos">
              <ul className="list-group profile-list">
                <li className="list-group-item">
                  <span className="permission-label">
                    <i className="bi bi-card-text"></i>
                    Generar tarjetas
                  </span>
                  <strong className={rolePermissions[profile.role].canGenerateCard ? 'permission-yes' : 'permission-no'}>
                    <i className={rolePermissions[profile.role].canGenerateCard ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}></i>
                  </strong>
                </li>

                <li className="list-group-item">
                  <span className="permission-label">
                    <i className="bi bi-collection"></i>
                    Generar temas
                  </span>
                  <strong className={rolePermissions[profile.role].canCreateThemes ? 'permission-yes' : 'permission-no'}>
                    <i className={rolePermissions[profile.role].canCreateThemes ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}></i>
                  </strong>
                </li>

                <li className="list-group-item">
                  <span className="permission-label">
                    <i className="bi bi-people"></i>
                    Gestionar usuarios
                  </span>
                  <strong className={rolePermissions[profile.role].canManageUser ? 'permission-yes' : 'permission-no'}>
                    <i className={rolePermissions[profile.role].canManageUser ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}></i>
                  </strong>
                </li>
              </ul>
            </Card>

            <Card
              title="Actividad"
              footer={
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Ver mis colecciones
                </button>
              }
            >
              <div className="profile-stats">
                <div className="stat-box">
                  <span className="stat-value">
                    {profile.stats.generatedCards}
                  </span>

                  <span className="stat-label">
                    Tarjetas generadas
                  </span>
                </div>

                {(profile.role === "CREATOR" || profile.role === "ADMIN") && (
                  <div className="stat-box">
                    <span className="stat-value">
                      {profile.stats.createdThemes}
                    </span>

                    <span className="stat-label">
                      Temas creados
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onUpdated={async () => {
          const data = await getProfile();
          setProfile({
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            educationalCenter: data.educationalCenter,
            vocationalFamily: data.vocationalFamily?.name ?? null,
            role: data.role.name as Role,
            stats: profile.stats,
          });
        }}
      />
    </div>
  );
}
