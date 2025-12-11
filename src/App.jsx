import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Products from "./pages/Products";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // para saber en qué ruta estás

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Si hay usuario logueado → envía a inventario
      if (currentUser && location.pathname === "/") {
        navigate('/inventory');
      }
    });

    return unsubscribe;
  }, [navigate, location.pathname]);

  const hideNavbar = location.pathname === "/"; // NO mostrar en login

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR GLOBAL */}
      {!hideNavbar && <Navbar user={user} />}

      <Routes>
        {/* Página principal (Login placeholder) */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
              <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center">
                  Iniciar Sesión (Placeholder)
                </h2>
                <p className="text-gray-600 text-center">
                  Próximamente: Form login (HU1.2).
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg text-center hover:bg-orange-600 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          }
        />

        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        {/* Pagina inventario */}
        <Route path="/products" element={<Products />} />
        
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
