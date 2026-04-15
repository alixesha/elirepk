import { useState } from 'react';
import { ShoppingCart, Zap, Heart, Star, ArrowLeft, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../context/NavigationContext';

interface ProductPageProps {
  productId: string;
}

export default function ProductPage({ productId }: ProductPageProps) {
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { navigate } = useNavigation();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Product not found</p>
          <button onClick={() => navigate('home')} className="text-yellow-500 underline">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    navigate('checkout');
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded"
                  style={{ backgroundColor: '#C9A84C', color: '#000' }}>
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                  -{discount}% OFF
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? 'border-yellow-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#C9A84C' : 'none'}
                      style={{ color: '#C9A84C' }} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-bold text-green-400">Save Rs. {(product.originalPrice! - product.price).toLocaleString()}</span>
                )}
              </div>
            </div>

            {product.sizes && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Size {selectedSize && <span style={{ color: '#C9A84C' }}>- {selectedSize}</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-yellow-500 text-black'
                          : 'border-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                      style={selectedSize === size ? { backgroundColor: '#C9A84C' } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Color {selectedColor && <span style={{ color: '#C9A84C' }}>- {selectedColor}</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        selectedColor === color
                          ? 'text-black border-yellow-500'
                          : 'border-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                      style={selectedColor === color ? { backgroundColor: '#C9A84C' } : {}}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold text-sm mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}>Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-gray-500 flex items-center justify-center text-lg transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-white font-bold text-lg w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-700 text-white hover:border-gray-500 flex items-center justify-center text-lg transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wider uppercase rounded-full border-2 transition-all duration-300 ${
                  added
                    ? 'border-green-500 text-green-400'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
              >
                <Zap size={16} /> Buy Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  wishlisted
                    ? 'border-red-500 bg-red-500/10 text-red-500'
                    : 'border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="border border-gray-800 rounded-xl p-4 space-y-3">
              {[
                { Icon: Truck, text: 'Free delivery across Pakistan' },
                { Icon: Shield, text: '100% Original & Authentic' },
                { Icon: RefreshCw, text: '7-day easy returns' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-400">
                  <Icon size={16} style={{ color: '#C9A84C' }} />
                  {text}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}>Description</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
