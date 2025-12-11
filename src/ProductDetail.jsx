import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Capturamos el ID de la URL (ej: 1)
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulación de buscar en la base de datos (Esto luego lo cambiarás por Firebase)
  useEffect(() => {
    // Simulamos un pequeño tiempo de carga para que se vea realista
    setTimeout(() => {
      setProducto({
        id: id,
        nombre: "Laptop Gamer TechPro X",
        precio: 1299.99,
        moneda: "USD",
        stock: 5, // Requisito de Jira: Mostrar stock
        descripcion: "Esta laptop cuenta con procesador de última generación, tarjeta gráfica RTX 4060 y pantalla de 144Hz. Ideal para desarrollo de software y gaming de alto rendimiento. Incluye garantía de 1 año.",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        categoria: "Computación"
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Cargando producto...</div>;
  }

  if (!producto) {
    return <div className="text-center mt-20 text-red-500">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* Botón de Regresar (Requisito: No perder navegación) */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
        ⬅ Volver al catálogo
      </Link>

      {/* Contenedor Principal (Grid de 2 columnas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Columna Izquierda: Imagen */}
        <div className="flex justify-center items-center bg-gray-100 rounded-xl p-4">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide">{producto.categoria}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{producto.nombre}</h1>
          
          {/* Precio */}
          <div className="text-3xl font-bold text-green-600 mb-4">
            ${producto.precio} {producto.moneda}
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Descripción:</h3>
            <p className="text-gray-600 leading-relaxed">
              {producto.descripcion}
            </p>
          </div>

          {/* Stock (Requisito de Jira) */}
          <div className="mb-8">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${producto.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {producto.stock > 0 ? `Disponible: ${producto.stock} unidades` : 'Agotado'}
            </span>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md">
              Agregar al Carrito
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
              ❤️
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;