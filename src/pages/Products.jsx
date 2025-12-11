import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProductos } from "../services/productsService";

const PAGE_SIZE = 10;

export default function Products({ searchTerm = "" }) {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await fetchProductos();
      setProductos(data);
      setFilteredProductos(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    setPage(0); // Resetear a la primera página cuando cambia la búsqueda

    if (!searchTerm.trim()) {
      setFilteredProductos(productos);
      return;
    }

    const termLower = searchTerm.toLowerCase();
    const filtered = productos.filter((p) => {
      const nombre = p.nombre?.toLowerCase() || '';
      const categoria = p.categoria?.toLowerCase() || '';
      const descripcion = p.descripcion?.toLowerCase() || '';
      
      return (
        nombre.includes(termLower) ||
        categoria.includes(termLower) ||
        descripcion.includes(termLower)
      );
    });

    setFilteredProductos(filtered);
  }, [searchTerm, productos]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Cargando productos...</div>;
  }

  const totalPages = Math.ceil(filteredProductos.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const list = filteredProductos.slice(start, start + PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Mensaje de no resultados */}
      {searchTerm && filteredProductos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron productos que coincidan con "{searchTerm}"
          </p>
        </div>
      )}

      {/* GRID */}
      {filteredProductos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map(producto => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      )}

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
