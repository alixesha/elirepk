import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function Footer() {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-widest text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}>ELIR</span>
              <span className="text-2xl font-black tracking-widest"
                style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>EPK</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pakistan's premium online fashion destination. Bringing luxury clothing, watches, and shoes to your doorstep.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button key={i} className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:border-yellow-600 hover:text-yellow-500 transition-all duration-200">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-wider uppercase text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', action: () => navigate('home') },
                { label: 'Clothing', action: () => navigate('category', { category: 'clothing' }) },
                { label: 'Watches', action: () => navigate('category', { category: 'watches' }) },
                { label: 'Shoes', action: () => navigate('category', { category: 'shoes' }) },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-gray-400 hover:text-yellow-500 text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-wider uppercase text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Customer Care
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Track Order', 'Return Policy', 'Size Guide', 'FAQs', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button className="hover:text-yellow-500 transition-colors duration-200">{item}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold tracking-wider uppercase text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              {[
                { Icon: MapPin, text: 'Lahore, Pakistan' },
                { Icon: Phone, text: '+92 300 0000000' },
                { Icon: Mail, text: 'info@elirepk.com' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-gray-400 text-sm">
                  <Icon size={14} style={{ color: '#C9A84C' }} className="shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            &copy; 2024 ELIREPK. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px w-8" style={{ backgroundColor: '#C9A84C' }}></div>
            <p className="text-xs" style={{ color: '#C9A84C' }}>Premium Quality Guaranteed</p>
            <div className="h-px w-8" style={{ backgroundColor: '#C9A84C' }}></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
