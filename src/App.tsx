import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryPage from './pages/CategoryPage';

function AppContent() {
  const { nav } = useNavigation();

  const renderPage = () => {
    switch (nav.page) {
      case 'home':
        return <HomePage />;
      case 'product':
        return nav.productId ? <ProductPage productId={nav.productId} /> : <HomePage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'category':
        return nav.category ? <CategoryPage category={nav.category} /> : <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </NavigationProvider>
  );
}
