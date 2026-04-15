import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

const categories = [
  {
    id: 'clothing',
    label: 'Clothing',
    subtitle: 'Shirts, Blazers & More',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: '120+ Items',
  },
  {
    id: 'watches',
    label: 'Watches',
    subtitle: 'Luxury Timepieces',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: '80+ Items',
  },
  {
    id: 'shoes',
    label: 'Shoes',
    subtitle: 'Formal & Casual',
    image: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: '100+ Items',
  },
];

export default function CategorySection() {
  const { navigate } = useNavigation();

  return (
    <section id="categories" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: '#C9A84C' }}></div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
              Browse By Category
            </span>
            <div className="h-px w-10" style={{ backgroundColor: '#C9A84C' }}></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Shop Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('category', { category: cat.id })}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] md:aspect-auto md:h-96 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(201,168,76,0.3), transparent)' }}>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <span className="text-xs text-gray-300 tracking-wider uppercase mb-1 block">{cat.count}</span>
                <h3 className="text-3xl font-black text-white mb-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>{cat.label}</h3>
                <p className="text-gray-300 text-sm mb-4">{cat.subtitle}</p>
                <div className="flex items-center gap-2 font-semibold text-sm transition-all duration-200 group-hover:gap-3"
                  style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                  Shop Now <ArrowRight size={16} />
                </div>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0"
                style={{ backgroundColor: '#C9A84C' }}>
                <ArrowRight size={16} color="black" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
