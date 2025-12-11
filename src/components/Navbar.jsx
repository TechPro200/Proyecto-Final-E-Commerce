import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ user, showLoginButton = false, onSearch }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="bg-orange-500 shadow-lg w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        
        {/* LOGO */}
        <Link to={user ? "/products" : "/"} className="flex items-center flex-shrink-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <span className="text-orange-500 font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-white font-bold text-lg">Biblos Electrónica</h1>
        </Link>

        {/* BUSCADOR - Solo visible cuando hay usuario */}
        {user && onSearch && (
          <SearchBar onSearch={onSearch} />
        )}

        {/* MENU HORIZONTAL - Solo visible cuando hay usuario */}
        {user && (
          <nav className="flex items-center gap-6">
            <Link
              to="/products"
              className="text-white font-semibold hover:text-gray-200 transition"
            >
              Productos
            </Link>
          </nav>
        )}

        {/* BOTÓN DE INICIAR SESIÓN - Solo visible en página de registro */}
        {showLoginButton && !user && (
          <div className="flex space-x-2">
            <Link
              to="/"
              className="bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        )}

        {/* CARRITO Y USUARIO - Solo se muestra si hay usuario logueado */}
        {user && (
          <div className="flex items-center gap-4">
            {/* BOTÓN DE CARRITO */}
            <button
              className="relative h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
              aria-label="Carrito de compras"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>

            {/* BURBUJA DE USUARIO */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
              >
                {user.email.charAt(0).toUpperCase()}
              </button>

              {/* DROPDOWN */}
              {openMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 border">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">
                    {user.email}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
