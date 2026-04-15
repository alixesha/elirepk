import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { navigate } = useNavigation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', action: () => navigate('home') },
    { label: 'Clothing', action: () => navigate('category', { category: 'clothing' }) },
    { label: 'Watches', action: () => navigate('category', { category: 'watches' }) },
    { label: 'Shoes', action: () => navigate('category', { category: 'shoes' }) },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black shadow-lg shadow-black/50' : 'bg-black/95 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="flex items-center gap-1">
              <span className="text-2xl md:text-3xl font-black tracking-widest text-white group-hover:text-gold-400 transition-colors duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                ELIR
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-widest"
                style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                EPK
              </span>
            </div>
            <div className="w-px h-6 ml-1" style={{ backgroundColor: '#C9A84C' }}></div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-gray-300 hover:text-white text-sm font-medium tracking-wider uppercase transition-colors duration-200 relative group"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: '#C9A84C' }}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-200 hidden sm:block">
              <Search size={20} />
            </button>
            <button
              onClick={() => navigate('cart')}
              className="text-gray-300 hover:text-white transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#C9A84C' }}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { link.action(); setMenuOpen(false); }}
                className="block w-full text-left text-gray-300 hover:text-white py-3 text-sm font-medium tracking-wider uppercase border-b border-gray-800/50 transition-colors duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
