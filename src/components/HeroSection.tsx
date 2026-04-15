import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function HeroSection() {
  const { navigate } = useNavigation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,168,76,0.3) 60px, rgba(201,168,76,0.3) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,168,76,0.3) 60px, rgba(201,168,76,0.3) 61px)'
        }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: '#C9A84C' }}></div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
              Premium Collection 2024
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Upgrade Your
            <br />
            <span style={{ color: '#C9A84C' }}>Style</span>
            <br />
            <span className="text-gray-200">with ELIREPK</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Premium Clothing &nbsp;&bull;&nbsp; Watches &nbsp;&bull;&nbsp; Shoes
            <br />
            <span className="text-sm text-gray-400">Exclusive designs. Unmatched quality. Cash on Delivery available.</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('category', { category: 'clothing' })}
              className="group flex items-center gap-2 px-8 py-4 text-black font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-900/30"
              style={{ backgroundColor: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
            >
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => {
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wider uppercase rounded-full hover:border-white/60 transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Explore Collection
            </button>
          </div>

          <div className="flex items-center gap-8 mt-12">
            {[
              { num: '500+', label: 'Products' },
              { num: '10K+', label: 'Customers' },
              { num: '4.9', label: 'Rating' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black" style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                  {num}
                </div>
                <div className="text-gray-400 text-xs tracking-wider uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-200 animate-bounce"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
