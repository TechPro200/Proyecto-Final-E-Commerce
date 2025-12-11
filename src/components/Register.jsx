import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    tarjeta: '',
    cedula: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (pass) => {
    const minMax = pass.length >= 6 && pass.length <= 20;
    const noSymbols = /^[a-zA-Z0-9]+$/.test(pass);
    return minMax && noSymbols;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido o mal formato.');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Contraseña inválida: 6-20 caracteres alfanuméricos, sin símbolos.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        nombre: formData.nombre,
        apellido: formData.apellido,
        fechaNacimiento: formData.fechaNacimiento,
        tarjeta: formData.tarjeta,
        cedula: formData.cedula,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(user);

      setSuccess('Registro exitoso! Revisa tu email para verificar la cuenta.');

      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        tarjeta: '',
        cedula: '',
        password: '',
      });

    } catch (err) {
      setError('Error en registro: ' + err.message);
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
              to="/"
              className="bg-white text-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-xl p-6 space-y-6 mt-20">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-orange-500 text-2xl">⚡</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Registro de Usuario</h2>
          <p className="text-gray-600">Crea tu cuenta para acceder al e-commerce</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

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
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            name="tarjeta"
            placeholder="Tarjeta de Crédito"
            value={formData.tarjeta}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña (6-20 alfanum, sin símbolos)"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            minLength={6}
            maxLength={20}
            required
          />

          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm bg-green-50 p-2 rounded">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

      
      </div>
    </div>
  );
}
