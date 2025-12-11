import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ProductDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const ref = doc(db, "productos", id); // <--- CORREGIDO
                const snapshot = await getDoc(ref);

                if (snapshot.exists()) {
                    setProducto({ id: snapshot.id, ...snapshot.data() });
                } else {
                    setProducto(null);
                }
            } catch (error) {
                console.error("Error loading product:", error);
                setProducto(null);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);


    if (loading)
        return (
            <div className="text-center mt-20 text-xl font-semibold">
                Cargando producto...
            </div>
        );

    if (!producto)
        return (
            <div className="text-center mt-20 text-red-500 text-xl font-semibold">
                Producto no encontrado
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Botón Regresar */}
            <Link
                to="/products"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
            >
                ← Volver al listado
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">

                {/* IMAGEN */}
                <div className="flex justify-center items-center bg-gray-100 rounded-xl p-4">
                    <img
                        src={producto.imagenUrl}
                        alt={producto.nombre}
                        className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* INFORMACIÓN */}
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {producto.categoria}
                    </p>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {producto.nombre}
                    </h1>

                    <div className="text-3xl font-bold text-green-600 mb-4">
                        ${producto.precio}
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Descripción:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {producto.descripcion}
                        </p>
                    </div>

                    {/* STOCK */}
                    <div className="mb-8">
                        <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${producto.stock > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {producto.stock > 0
                                ? `Disponible: ${producto.stock} unidades`
                                : "Agotado"}
                        </span>
                    </div>

                    {/* BOTONES */}
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

}
