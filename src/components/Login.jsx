import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email inválido o mal formato.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // El navigate a /inventory se maneja automáticamente con onAuthStateChanged en App.jsx
      navigate("/inventory");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Verifica tu email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (err.code === "auth/invalid-credential") {
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
      } else {
        setError("Error al iniciar sesión: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <header className="bg-orange-500 shadow-lg fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <span className="text-orange-500 font-bold text-sm">⚡</span>
            </div>
            <h1 className="text-white font-bold text-lg">Biblos Electrónica</h1>
          </div>

          <div className="flex space-x-2">
            <Link
              to="/register"
              className="bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6 mt-20">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-orange-500 text-2xl">⚡</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta del e-commerce</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
