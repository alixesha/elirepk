import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import OfferBanner from '../components/OfferBanner';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <OfferBanner />
      <WhyChooseUs />
    </main>
  );
}
