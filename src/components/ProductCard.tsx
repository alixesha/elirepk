import { ShoppingCart, Heart, Zap, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../context/NavigationContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { navigate } = useNavigation();
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-700 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-900/10">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          onClick={() => navigate('product', { productId: product.id })}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-1 text-xs font-bold tracking-wider uppercase rounded"
            style={{ backgroundColor: '#C9A84C', color: '#000' }}>
            {product.badge}
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-12 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            -{discount}%
          </div>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-red-500 text-white'
              : 'bg-black/60 text-gray-300 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
          <button
            onClick={() => navigate('product', { productId: product.id })}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 text-black"
            style={{ backgroundColor: '#C9A84C' }}
          >
            <Zap size={13} />
            Buy Now
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <button
          onClick={() => navigate('product', { productId: product.id })}
          className="text-white font-medium text-sm leading-tight hover:text-yellow-400 transition-colors duration-200 line-clamp-2 text-left w-full"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {product.name}
        </button>

        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? '#C9A84C' : 'none'}
                style={{ color: '#C9A84C' }}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
