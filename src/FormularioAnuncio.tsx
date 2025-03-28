// src/components/FormularioAnuncio.tsx
import React, { useState } from 'react';
import { Label, TextInput, Textarea, Button, Select, Checkbox, Alert, Modal } from 'flowbite-react';
import axios from 'axios';
import Tesseract from 'tesseract.js';

export default function FormularioAnuncio({ mostrar, onClose }: { mostrar: boolean; onClose: () => void }) {
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

  const analizarTextoImagen = async (file: File) => {
    const { data } = await Tesseract.recognize(file, 'eng');
    const textoDetectado = data.text.trim();
    const cantidadTexto = textoDetectado.length;
    console.log("Texto detectado en imagen:", textoDetectado);

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
    <Modal show={mostrar} onClose={onClose} size="lg" dismissible>
      <Modal.Header>Publicar Anuncio</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4">
          <Select name="plan" value={plan} onChange={(e) => setPlan(e.target.value as 'basico' | 'premium')}>
            <option value="basico">Plan Básico ($1)</option>
            <option value="premium">Plan Premium ($5)</option>
          </Select>

          <TextInput name="titulo" placeholder="Título" onChange={e => setTitulo('')} required autoComplete="off" />
          <Textarea name="descripcion" placeholder="Descripción" rows={3} onChange={e => setDescripcion(e.target.value || '')} required />
          <TextInput name="localidad" placeholder="Localidad" onChange={e => setLocalidad(e.target.value || '')} required />
          <TextInput name="precio" placeholder="Precio" onChange={e => setPrecio(e.target.value || '')} required />

          <Select name="categoria" value={categoria} onChange={e => setCategoria(e.target.value || '')} required>
            <option value="">Seleccioná una categoría</option>
            <option value="Comida">Comida</option>
            <option value="Ropa">Ropa</option>
            <option value="Servicios">Servicios</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Otro">Otro</option>
          </Select>

          {plan === 'premium' && (
            <>
              <TextInput name="whatsapp" placeholder="Número de WhatsApp" onChange={e => setWhatsapp(e.target.value || '')} />
              <TextInput name="telefono" placeholder="Teléfono para llamadas" onChange={e => setTelefono(e.target.value || '')} />
              <TextInput name="url" placeholder="URL de tu página web" onChange={e => setUrl(e.target.value || '')} />
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
      </Modal.Body>
    </Modal>
  );
}
