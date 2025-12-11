import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

// Un componente simple para simular la página de inicio (esto luego lo hará tu compañero)
const Inicio = () => (
  <div style={{ padding: '20px' }}>
    <h1>🏠 Página de Inicio</h1>
    <p>Para ver tu tarea, escribe en el navegador: <b>/producto/1</b> al final de la dirección.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta 1: La página principal (/) */}
        <Route path="/" element={<Inicio />} />

        {/* Ruta 2: Tu tarea - Vista Detallada (/producto/cualquier-numero) */}
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;