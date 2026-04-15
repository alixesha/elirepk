import { Tag, ArrowRight, Clock } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function OfferBanner() {
  const { navigate } = useNavigation();

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12"
          style={{
            background: 'linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a1200 100%)',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
          </div>
          <div className="absolute inset-0 opacity-80"
            style={{ background: 'linear-gradient(135deg, rgba(26,18,0,0.95) 0%, rgba(45,31,0,0.90) 50%, rgba(26,18,0,0.95) 100%)' }}>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Tag size={16} style={{ color: '#C9A84C' }} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase"
                  style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                  Limited Time Offer
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Flat{' '}
                <span style={{ color: '#C9A84C' }}>20% OFF</span>
              </h2>
              <p className="text-gray-300 text-lg mb-2">
                On All Premium Products — Hurry, Offer Ends Soon!
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400 text-sm">
                <Clock size={14} />
                <span>Use code: <strong className="text-white">ELIR20</strong> at checkout</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-8xl font-black leading-none mb-2"
                style={{ color: 'rgba(201,168,76,0.15)', fontFamily: "'Poppins', sans-serif" }}>
                20%
              </div>
              <button
                onClick={() => navigate('category', { category: 'clothing' })}
                className="group flex items-center gap-2 px-8 py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-900/30"
                style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
              >
                Shop Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          <div className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-10"
            style={{ border: '2px solid #C9A84C' }}></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-10"
            style={{ border: '2px solid #C9A84C' }}></div>
        </div>
      </div>
    </section>
  );
}
