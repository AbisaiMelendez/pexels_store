import './index.css';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ProductCard from './ProductCard';
import Footer from './assets/Footer';
import FiltroBar from './FiltroVar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CrearAnuncio from './FormularioAnuncio';

interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  localidad: string;
  imagenUrl: string;
  estado: string;
  clics: number;
}

interface Filtro {
  categoria: string;
  localidad: string;
  destacados: boolean;
  busqueda: string;
}

function Home() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [filtro, setFiltro] = useState<Filtro>({
    categoria: '',
    localidad: '',
    destacados: false,
    busqueda: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://157.230.188.1:5000/api/anuncios')
      .then((res) => setAnuncios(res.data))
      .catch((err) => console.error('Error al obtener anuncios:', err));
  }, []);

  const handleClic = (id: number) => {
    axios
      .post(`http://157.230.188.1:5000/api/anuncios/${id}/clic`)
      .then(() => {
        setAnuncios((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, clics: (a.clics || 0) + 1 } : a
          )
        );
      })
      .catch((err) => console.error('Error al contar clic:', err));
  };

  const handleBusquedaChange = (valor: string) => {
    setFiltro({ ...filtro, busqueda: valor });
  };

  const handleBuscar = () => {
    console.log('Buscando con:', filtro);
  };

  const anunciosFiltrados = anuncios
    .filter((a) => !filtro.categoria || a.categoria === filtro.categoria)
    .filter((a) => !filtro.localidad || a.localidad === filtro.localidad)
    .filter((a) =>
      !filtro.busqueda ||
      a.titulo.toLowerCase().includes(filtro.busqueda.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(filtro.busqueda.toLowerCase())
    )
    .sort((a, b) => (filtro.destacados ? (b.clics || 0) - (a.clics || 0) : 0));

  return (
    <div>
      <Navbar onPublicarClick={() => navigate('/crear-anuncio')} />
      <HeroSection />

      <FiltroBar
        {...filtro}
        onChange={setFiltro}
        onBusqueda={handleBusquedaChange}
        onBuscarClick={handleBuscar}
      />

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {anunciosFiltrados.map((item, index) => (
          <ProductCard
            key={index}
            product={{
              name: item.titulo,
              image: item.imagenUrl,
              descripcion: item.descripcion,
              clics: item.clics || 0
            }}
            onClick={() => handleClic(item.id)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-anuncio" element={<CrearAnuncio />} />
      </Routes>
    </Router>
  );
}
