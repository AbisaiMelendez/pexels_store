//import React from 'react';

const ProductCard = ({ product }: { product: { name: string, price: number, image: string } }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="mt-2">${product.price}</p>
        <button className="bg-rose-400 hover:bg-red-500 text-white py-2 px-4 mt-4 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
