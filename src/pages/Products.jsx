import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProductos } from "../services/productsService";

const PAGE_SIZE = 10;

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await fetchProductos();
      setProductos(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Cargando productos...</div>;
  }

  if (productos.length === 0) {
    return <div className="p-6 text-center text-gray-500">No hay productos disponibles.</div>;
  }

  const totalPages = Math.ceil(productos.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const list = productos.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {list.map(producto => (
          <ProductCard key={producto.id} product={producto} />
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-30 hover:bg-gray-100"
        >
          Anterior
        </button>

        <span className="text-gray-500 text-sm">
          Página {page + 1} de {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-30 hover:bg-gray-100"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
