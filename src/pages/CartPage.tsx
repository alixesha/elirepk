import { ShoppingCart, Trash2, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { navigate } = useNavigation();

  const shipping = totalPrice >= 5000 ? 0 : 199;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full border border-gray-700 flex items-center justify-center mx-auto">
            <ShoppingCart size={32} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Your cart is empty
          </h2>
          <p className="text-gray-400">Add some premium products to get started</p>
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 mx-auto px-8 py-3 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Shopping Cart
            <span className="text-lg font-normal text-gray-400 ml-3">({totalItems} items)</span>
          </h1>
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="flex gap-4 p-4 bg-gray-950 border border-gray-800 rounded-2xl hover:border-gray-700 transition-all duration-200"
              >
                <div className="w-24 h-28 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.product.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.size && (
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                        Color: {item.color}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-lg text-white mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {item.product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-900 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="text-white font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      className="text-gray-500 hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-white font-bold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-xl font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}>Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-white">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Add Rs. {(5000 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2">
                  <Tag size={14} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="bg-transparent text-white text-sm flex-1 outline-none placeholder-gray-600"
                  />
                </div>
                <button className="px-4 py-2 rounded-xl text-black text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#C9A84C' }}>
                  Apply
                </button>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-white font-bold text-lg"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>Total</span>
                  <span className="text-white font-black text-xl"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => navigate('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
                <span>Secure Checkout</span>
                <span>•</span>
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
