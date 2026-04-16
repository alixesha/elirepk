import { useState } from 'react';
import { ArrowLeft, CheckCircle, Loader, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { supabase } from '../lib/supabase';

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', Icon: Banknote, description: 'Pay when you receive your order' },
  { id: 'jazzcash', label: 'JazzCash', Icon: Smartphone, description: 'Pay via JazzCash mobile wallet' },
  { id: 'easypaisa', label: 'Easypaisa', Icon: CreditCard, description: 'Pay via Easypaisa mobile account' },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
  });

  const shipping = totalPrice >= 5000 ? 0 : 199;
  const grandTotal = totalPrice + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) return;
    setLoading(true);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: `${form.address}, ${form.city}`,
          payment_method: form.paymentMethod,
          total_amount: grandTotal,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size || '',
        color: item.color || '',
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;
```ts
// Build WhatsApp order message
let itemsText = "";

items.forEach((item, index) => {
  const itemTotal = item.product.price * item.quantity;
itemsText += `${index + 1}. ${item.product.name}
Qty: ${item.quantity}
Price: Rs.${item.product.price}
Total: Rs.${itemTotal}

`;
});

const message = `🛒 *New Order*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📍 Address: ${form.address}, ${form.city}

💳 Payment Method: ${form.paymentMethod}

🛍️ *Order Details:*
${itemsText}

💰 *Grand Total:* Rs.${grandTotal}`;

const whatsappNumber = "923407690640";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappUrl, "_blank");
```
  
      clearCart();
      setSuccess(true);
    } catch (err) {
      console.error('Order failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '2px solid #C9A84C' }}>
            <CheckCircle size={40} style={{ color: '#C9A84C' }} />
          </div>
          <h2 className="text-3xl font-black text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Order Placed!
          </h2>
          <p className="text-gray-400 text-lg">
            Thank you, <strong className="text-white">{form.name}</strong>! Your order has been confirmed. We will contact you at <strong className="text-white">{form.phone}</strong> shortly.
          </p>
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 text-left space-y-2">
            <p className="text-gray-400 text-sm">
              <span className="text-gray-500">Payment:</span>{' '}
              <span className="text-white font-medium capitalize">{form.paymentMethod === 'cod' ? 'Cash on Delivery' : form.paymentMethod}</span>
            </p>
            <p className="text-gray-400 text-sm">
              <span className="text-gray-500">Total:</span>{' '}
              <span className="font-bold text-lg" style={{ color: '#C9A84C' }}>Rs. {grandTotal.toLocaleString()}</span>
            </p>
            <p className="text-gray-400 text-sm">
              <span className="text-gray-500">Delivery to:</span>{' '}
              <span className="text-white">{form.address}, {form.city}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="w-full py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-200 hover:opacity-90"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate('cart')}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <h1 className="text-3xl font-black text-white mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Muhammad Ali"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors duration-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Phone Number *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 0000000"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors duration-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Street Address *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={2}
                    placeholder="House No, Street, Area"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors duration-200 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">City *</label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-600 transition-colors duration-200"
                  >
                    <option value="">Select City</option>
                    {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map(({ id, label, Icon, description }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      form.paymentMethod === id
                        ? 'border-yellow-600 bg-yellow-900/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={id}
                      checked={form.paymentMethod === id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      form.paymentMethod === id ? '' : 'bg-gray-800'
                    }`}
                      style={form.paymentMethod === id ? { backgroundColor: 'rgba(201,168,76,0.15)' } : {}}>
                      <Icon size={18} style={{ color: form.paymentMethod === id ? '#C9A84C' : '#6b7280' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{label}</p>
                      <p className="text-gray-500 text-xs">{description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      form.paymentMethod === id ? 'border-yellow-500' : 'border-gray-600'
                    }`}>
                      {form.paymentMethod === id && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#C9A84C' }}></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
            >
              {loading ? <><Loader size={16} className="animate-spin" /> Placing Order...</> : 'Place Order'}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-gray-950 border border-gray-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}>Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3 py-2 border-b border-gray-800">
                    <img src={item.product.image} alt={item.product.name}
                      className="w-14 h-16 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2">{item.product.name}</p>
                      {item.size && <p className="text-gray-500 text-xs">Size: {item.size}</p>}
                      <p className="text-gray-400 text-xs mt-1">
                        Rs. {item.product.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-white text-sm font-bold shrink-0">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-semibold' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span className="text-white font-bold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>Total</span>
                  <span className="font-black text-xl" style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
