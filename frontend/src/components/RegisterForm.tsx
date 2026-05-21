import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { register } from "../api/register";

type RegisterFormProps = {
  onSuccess?: (role: string) => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [registerCode, setRegisterCode] = useState("")
  const [password, setPassword] = useState("");
  const [educationalCenter, setEducationalCenter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefiller código desde la query string
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setRegisterCode(code);
    }
  }, [searchParams]);

  // Validaciones
  const isValidPassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password); // 8 caracteres, mayúscula y número

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidPassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
      );
      return;
    }

    if(username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.')
      return
    }

    if(!registerCode) {
      setError('Debes introducir un código de registro.')
      return
    }

    if (!name || !lastName) {
      setError("Faltan datos obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name,
        lastName,
        username,
        password,
        registerCode,
        educationalCenter: educationalCenter || null,
      });

      if (result?.access_token) {
        sessionStorage.setItem("access_token", result.access_token);

        const tokenParts = result.access_token.split(".");
        let assignedRole = "USER";

        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));

          sessionStorage.setItem("user_role", payload.role);
          sessionStorage.setItem("username", payload.username);

          assignedRole = payload.role;
        }

        if (onSuccess) {
          onSuccess(assignedRole);
        }

        navigate("/dashboard");
      } else {
        throw new Error("Token no recibido del servidor");
      }
    } catch (err: any) {
      switch (err.message) {
        case "PASSWORD_INVALIDA":
          setError(
            "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
          );
          break;
        case "DATOS_OBLIGATORIOS":
          setError("Faltan datos obligatorios.");
          break;
        default:
          setError("No se ha podido registrar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card auth-card border-0 shadow-sm">
              <div className="card-body p-5">
                <h2 className="card-title mb-4 text-center">Registro</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Apellidos"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Código de registro"
                      value={registerCode}
                      onChange={(e) => setRegisterCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Centro educativo (opcional)"
                      value={educationalCenter}
                      onChange={(e) => setEducationalCenter(e.target.value)}
                    />
                  </div>

                  {error && <p className="text-danger">{error}</p>}

                  <button
                    className="btn btn-auth-submit w-100 py-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrarse"}
                  </button>

                  <p className="text-center mt-3 mb-0">
                    Ya tienes una cuenta <a href="/auth">Inicia Sesión</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
