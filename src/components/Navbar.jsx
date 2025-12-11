import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="w-full bg-orange-500 py-3 px-6 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO NUEVO */}
      <Link to="/products" className="flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
          <span className="text-orange-500 font-bold text-sm">⚡</span>
        </div>
        <h1 className="text-white font-bold text-lg">
          Biblos Electrónica
        </h1>
      </Link>

      {/* MENU HORIZONTAL */}
      <nav className="flex items-center gap-6">
        <Link
          to="/products"
          className="text-white font-semibold hover:text-gray-200 transition"
        >
          Productos
        </Link>

      </nav>

      {/* BURBUJA DE USUARIO */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition"
        >
          {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
        </button>

        {/* DROPDOWN */}
        {openMenu && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 border">

            <div className="px-4 py-2 text-sm text-gray-600 border-b">
              {user?.email}
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
    </header>
  );
}
