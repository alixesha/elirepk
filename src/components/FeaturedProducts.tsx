import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const { navigate } = useNavigation();
  const featured = products.slice(0, 8);

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundColor: '#C9A84C' }}></div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
                Hand Picked
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => navigate('category', { category: 'clothing' })}
            className="hidden md:flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
            style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <button
            onClick={() => navigate('category', { category: 'clothing' })}
            className="flex items-center gap-2 mx-auto text-sm font-semibold"
            style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}
          >
            View All Products <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
