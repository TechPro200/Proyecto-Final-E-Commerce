import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
        <div className="w-full h-40 bg-gray-100 overflow-hidden">
          <img
            src={product.imagenUrl}
            alt={product.nombre}
            className="w-full h-full object-cover transition hover:scale-105"
            onError={(e) => {
              console.log("Error cargando imagen:", product.imagenUrl);
              e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
            }}
          />
        </div>

        <div className="p-3 flex flex-col">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">
            {product.nombre}
          </h3>

          <p className="text-orange-600 font-bold text-lg">
            RD$ {product.precio?.toLocaleString("es-DO")}
          </p>

          <span className="text-[11px] text-gray-500 mt-1 uppercase">
            {product.categoria}
          </span>
          console.log("ID del producto en lista:", product.id);

        </div>
      </article>

    </Link>
  );
}

