
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


type ProductCardProps = {
  product: {
    name: string;
    image: string;
    descripcion: string;
    clics: number;

  };
  onClick?: () => void; // 👈 lo agregás como prop opcional
};

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div onClick={onClick} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
      <img
        className="w-full h-48 object-cover"
        src={`http://157.230.188.1:5000/api/imagen/${product.image}`}
        alt={product.name}
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="mt-2 text-gray-600 text-sm">{product.descripcion}</p>

        <div className="flex items-center mt-3 gap-2 text-sm">
          {product.clics > 0 ? (
            <AiFillHeart className="text-pink-500" />
          ) : (
            <AiOutlineHeart className="text-gray-400" />
          )}
          <span className="text-gray-600">{product.clics} clics</span>
        </div>


        <button
          onClick={(e) => {
            e.stopPropagation(); // evita que el clic se dispare dos veces
            alert("🚩 Reportado");
          }}
          className="bg-red-100 hover:bg-red-500 text-black py-2 px-4 mt-4 rounded text-sm"
        >
          🚩 Reportar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

