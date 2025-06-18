import { ArrowRight, Play } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop&crop=center"
          alt="Fitness Equipment"
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-primary-900/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your
              <span className="block text-primary-400">Fitness Journey</span>
            </h1>
            <p className="mt-6 text-xl text-secondary-200 max-w-2xl">
              Discover premium gym equipment and accessories designed for serious athletes and fitness enthusiasts. Quality gear that delivers results.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group border-2 border-white text-white hover:bg-white hover:text-secondary-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-400">50K+</div>
                <div className="text-secondary-300">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-400">500+</div>
                <div className="text-secondary-300">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-400">99%</div>
                <div className="text-secondary-300">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center"
                alt="Premium Equipment"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-xl">⚡</span>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-900">Free Shipping</div>
                    <div className="text-secondary-600 text-sm">On orders over $199</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary-500/20 rounded-full animate-bounce-subtle"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-500/20 rounded-full animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default HeroBanner;