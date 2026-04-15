import { Truck, Shield, RefreshCw, Star, Headphones, CreditCard } from 'lucide-react';

const features = [
  {
    Icon: Truck,
    title: 'Fast Delivery',
    description: 'Same day dispatch on all orders. Delivered to your doorstep across Pakistan within 2-3 days.',
  },
  {
    Icon: Shield,
    title: 'Original Products',
    description: '100% authentic products sourced directly. Every item comes with a quality guarantee.',
  },
  {
    Icon: RefreshCw,
    title: 'Easy Returns',
    description: '7-day hassle-free return policy. Not satisfied? We will make it right, no questions asked.',
  },
  {
    Icon: CreditCard,
    title: 'Cash on Delivery',
    description: 'Pay when you receive. JazzCash and Easypaisa also accepted for your convenience.',
  },
  {
    Icon: Headphones,
    title: '24/7 Support',
    description: 'Our customer care team is available around the clock to assist you with any queries.',
  },
  {
    Icon: Star,
    title: 'Premium Quality',
    description: 'Every product passes strict quality checks before reaching you. Luxury at fair prices.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10" style={{ backgroundColor: '#C9A84C' }}></div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: '#C9A84C', fontFamily: "'Poppins', sans-serif" }}>
              Why ELIREPK
            </span>
            <div className="h-px w-10" style={{ backgroundColor: '#C9A84C' }}></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            The ELIREPK Difference
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            We are committed to providing you with the best shopping experience in Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-gray-800 hover:border-yellow-700 bg-gray-950 hover:bg-gray-900 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <Icon size={22} style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                {title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
