// src/components/ProductCard.jsx
const ProductCard = ({ product }) => {
  return (
    <div className="group relative border rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;