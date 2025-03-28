// src/pages/CrearAnuncio.tsx
import React, { useState } from 'react';
import { Label, TextInput, Textarea, Button, Select, Checkbox, Alert } from 'flowbite-react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function CrearAnuncio() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState<'basico' | 'premium'>('basico');
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telefono, setTelefono] = useState('');
  const [url, setUrl] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [advertenciaTexto, setAdvertenciaTexto] = useState('');

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setter(e.target.value);
    };

  const analizarTextoImagen = async (file: File) => {
    const { data } = await Tesseract.recognize(file, 'eng');
    const textoDetectado = data.text.trim();
    const cantidadTexto = textoDetectado.length;

    if (/arma|pistola|desnudo|sexo|violencia/i.test(textoDetectado)) {
      alert('🚫 Imagen con contenido inapropiado. Por favor, subí otra.');
      setImagen(null);
      return;
    }

    if (cantidadTexto > 100) {
      setAdvertenciaTexto('⚠️ Tu imagen parece contener mucho texto. Considerá subir una imagen más visual.');
    } else {
      setAdvertenciaTexto('');
    }
  };

  const handleImagenChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy pesada (máximo 2MB)');
        return;
      }
      setImagen(file);
      await analizarTextoImagen(file);
    }
  };

  const handleSubmit = async () => {
    if (!aceptaPoliticas) {
      alert('Debes aceptar las políticas antes de continuar.');
      return;
    }
    if (!imagen) {
      alert('Debes subir una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
      const res = await axios.post('http://157.230.188.1:5000/api/subir', formData);
      const imagenUrl = res.data.imagenUrl;

      const anuncio = {
        titulo,
        descripcion,
        categoria,
        localidad,
        precio,
        whatsapp,
        telefono,
        url,
        imagenUrl,
        plan,
      };

      await axios.post('http://157.230.188.1:5000/api/anuncios', anuncio);
      setMensaje('✅ Anuncio enviado correctamente. Será revisado antes de publicarse.');
    } catch (err) {
      console.error(err);
      alert('Error al enviar el anuncio');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-semibold mb-4">Publicar Anuncio</h1>
        <div className="grid grid-cols-1 gap-4">
          <Select name="plan" value={plan} onChange={(e) => setPlan(e.target.value as 'basico' | 'premium')}>
            <option value="basico">Plan Básico ($1)</option>
            <option value="premium">Plan Premium ($5)</option>
          </Select>

          <TextInput name="titulo" placeholder="Título" value={titulo} onChange={handleChange(setTitulo)} />
          <Textarea name="descripcion" placeholder="Descripción" rows={3} value={descripcion} onChange={handleChange(setDescripcion)} />
          <TextInput name="localidad" placeholder="Localidad" value={localidad} onChange={handleChange(setLocalidad)} />
          <TextInput name="precio" placeholder="Precio" value={precio} onChange={handleChange(setPrecio)} />

          <Select name="categoria" value={categoria} onChange={handleChange(setCategoria)}>
            <option value="">Seleccioná una categoría</option>
            <option value="Comida">Comida</option>
            <option value="Ropa">Ropa</option>
            <option value="Servicios">Servicios</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Otro">Otro</option>
          </Select>

          {plan === 'premium' && (
            <>
              <TextInput name="whatsapp" placeholder="Número de WhatsApp" value={whatsapp} onChange={handleChange(setWhatsapp)} />
              <TextInput name="telefono" placeholder="Teléfono para llamadas" value={telefono} onChange={handleChange(setTelefono)} />
              <TextInput name="url" placeholder="URL de tu página web" value={url} onChange={handleChange(setUrl)} />
            </>
          )}

          <input type="file" accept="image/*" onChange={handleImagenChange} />
          {advertenciaTexto && <Alert color="warning">{advertenciaTexto}</Alert>}

          <div className="bg-gray-100 p-3 rounded text-sm">
            <Checkbox checked={aceptaPoliticas} onChange={(e) => setAceptaPoliticas(e.target.checked)} />
            <span className="ml-2">
              Acepto las condiciones de uso.{' '}
              <button type="button" className="underline text-blue-600 text-sm" onClick={() => setMostrarPoliticas(!mostrarPoliticas)}>
                Ver más políticas
              </button>
            </span>
            {mostrarPoliticas && (
              <div className="mt-2 text-xs text-gray-600">
                Pexels.cloud no se hace responsable por el contenido de los anuncios. No promovemos negocios ilegales, armas,
                contenido sexual, fraudes ni servicios no permitidos por la ley. Al subir un anuncio, el usuario acepta ser
                responsable del contenido publicado. El incumplimiento de estas reglas podrá generar el bloqueo permanente de su
                cuenta o del anuncio sin reembolso.
              </div>
            )}
          </div>

          <Button disabled={!aceptaPoliticas} onClick={handleSubmit} color="success">
            Enviar Anuncio
          </Button>

          {mensaje && <Alert color="info">{mensaje}</Alert>}
        </div>
      </div>
    </>
  );
}
