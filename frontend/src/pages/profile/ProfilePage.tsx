import "./profile.css";
import { BarraNavegacion } from "../../components/barra-navegacion";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";
import { EditProfileModal } from "../../components/Profile/EditProfileModal";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";

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

  //mock temporal
  stats: {
    generatedCards: number;
    createdThemes: number;
  };
};

//mock temporal
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
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        const formattedProfile: UserProfile = {
          id: data.id,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          educationalCenter: data.educationalCenter,
          vocationalFamily: data.vocationalFamily?.name ?? null,
          role: data.role.name as Role,

          //mock temporal
          stats: {
            generatedCards: 12,
            createdThemes: 3,
          },
        };

        setProfile(formattedProfile);
      } catch (error) {
        console.error(error);
        navigate("/auth");
      }
    }
    loadProfile();
  }, [navigate]);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div className="d-flex flex-column flex-md-row profile-layout-wrapper">
      <BarraNavegacion />

      <AdminSidebar />

      {/* Contenedor principal */}
      <main className="flex-grow-1 p-4 p-md-5 profile-layout-main">
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <h2
              className="mb-0 fw-bold"
              style={{ color: "var(--tabu-primary)" }}
            >
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
              <p>
                <strong>Nombre: </strong>
                {profile.name}
              </p>
              <p>
                <strong>Apellido: </strong>
                {profile.lastName}
              </p>
              <p>
                <strong>Email: </strong>
                {profile.email}
              </p>
              <p>
                <strong>Centro educativo: </strong>
                {profile.educationalCenter}
              </p>
              <p>
                <strong>Familia Profesional: </strong>
                {profile.vocationalFamily}
              </p>

              <button
                className="btn btn-primary mt-3"
                onClick={() => setEditOpen(true)}
              >
                Editar perfil
              </button>
            </Card>

            <Card title="Permisos">
              <p>
                {rolePermissions[profile.role].canGenerateCard ? "✔" : "✖"}{" "}
                Generar tarjetas
              </p>
              <p>
                {rolePermissions[profile.role].canCreateThemes ? "✔" : "✖"}{" "}
                Generar temas
              </p>
              <p>
                {rolePermissions[profile.role].canManageUser ? "✔" : "✖"}{" "}
                Gestionar usuarios
              </p>
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
              <p>Tarjetas generadas: {profile.stats.generatedCards}</p>

              {(profile.role === "CREATOR" || profile.role === "ADMIN") && (
                <p>Temas creados: {profile.stats.createdThemes}</p>
              )}
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
