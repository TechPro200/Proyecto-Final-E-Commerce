import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Products from "./pages/Products";

function AppContent() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR GLOBAL - Se muestra en todas las rutas con comportamiento dinámico */}
      <Navbar 
        user={user} 
        showLoginButton={location.pathname === "/register"}
        onSearch={location.pathname === "/products" ? handleSearch : null}
      />

      <Routes>
        {/* Página principal (Login placeholder) */}
        <Route path="/" element={<Login />} />

        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        {/* Pagina inventario */}
        <Route path="/products" element={<Products searchTerm={searchTerm} />} />
        
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
