// src/components/FiltroBar.tsx
import { ChangeEvent } from 'react';

type FiltroProps = {
    categoria: string;
    localidad: string;
    destacados: boolean;
    busqueda: string;
    onChange: (filtro: {
        categoria: string;
        localidad: string;
        destacados: boolean;
        busqueda: string;
    }) => void;
    onBusqueda: (valor: string) => void;
    onBuscarClick: () => void;
};

export default function FiltroBar({
    categoria,
    localidad,
    destacados,
    busqueda,
    onChange,
    onBusqueda,
    onBuscarClick,
}: FiltroProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        onChange({
            categoria: name === 'categoria' ? value : categoria,
            localidad: name === 'localidad' ? value : localidad,
            destacados: name === 'destacados' ? checked : destacados,
            busqueda,
        });
    };

    return (
        <div className="bg-white shadow p-4 rounded mb-6 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
            <input
                type="text"
                name="busqueda"
                placeholder="Buscar por título..."
                value={busqueda}
                onChange={(e) => onBusqueda(e.target.value)}
                className="border p-2 rounded w-full md:w-64"
            />
            <select
                name="categoria"
                value={categoria}
                onChange={handleChange}
                className="border p-2 rounded"
            >
                <option value="">Todas las categorías</option>
                <option value="Comida">Comida</option>
                <option value="Ropa">Ropa</option>
                <option value="Servicios">Servicios</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Otro">Otro</option>
            </select>

            <select
                name="localidad"
                value={localidad}
                onChange={handleChange}
                className="border p-2 rounded"
            >
                <option value="">Todas las localidades</option>
                <option value="San Salvador">San Salvador</option>
                <option value="Santa Ana">Santa Ana</option>
                <option value="La Libertad">La Libertad</option>
                <option value="Sonsonate">Sonsonate</option>
            </select>



            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="destacados"
                    checked={destacados}
                    onChange={handleChange}
                />
                Solo destacados
            </label>

            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                onClick={onBuscarClick}
            >
                Buscar
            </button>
        </div>
    );
}
