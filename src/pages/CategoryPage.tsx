import { useState } from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '../context/NavigationContext';

interface CategoryPageProps {
  category: string;
}

const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
  clothing: {
    title: 'Clothing',
    description: 'Premium shirts, blazers, polos and more',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  watches: {
    title: 'Watches',
    description: 'Luxury timepieces for every occasion',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  shoes: {
    title: 'Shoes',
    description: 'Premium footwear for the modern man',
    image: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
};

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export default function CategoryPage({ category }: CategoryPageProps) {
  const { navigate } = useNavigation();
  const [sort, setSort] = useState<SortOption>('featured');
  const meta = categoryMeta[category] || { title: category, description: '', image: '' };
  const rawProducts = getProductsByCategory(category);

  const sortedProducts = [...rawProducts].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={meta.image} alt={meta.title}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 mb-4"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              {meta.title}
            </h1>
            <p className="text-gray-400 mt-1">{meta.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400 text-sm">
            {sortedProducts.length} products
          </p>
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-yellow-600 transition-colors duration-200"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
