import { useEffect, useState } from "react";
import { fetchActiveProducts } from "../services/productsService";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchActiveProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema cargando los productos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const currentPageProducts = products.slice(start, start + PAGE_SIZE);

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Cargando productos electrónicos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="py-10 text-center text-slate-500">
        No hay productos disponibles por el momento.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">
          Electrónicos destacados
        </h2>
        <span className="text-xs text-slate-500">
          Mostrando {currentPageProducts.length} de {products.length} productos
        </span>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentPageProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="px-3 py-1 text-sm rounded-full border border-slate-200 disabled:opacity-40"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            Anterior
          </button>
          <span className="text-xs text-slate-500">
            Página {page + 1} de {totalPages}
          </span>
          <button
            className="px-3 py-1 text-sm rounded-full border border-slate-200 disabled:opacity-40"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;
