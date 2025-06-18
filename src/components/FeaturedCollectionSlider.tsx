import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { mockCollections } from '../data/mockData';
import { useAppDispatch } from '../hooks/useRedux';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';


const FeaturedCollectionSlider = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleViewAllClick = () => {
    navigate('/CollectionPage'); // yeh aapke next page ka path hoga
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState(mockCollections[0].products.slice(0, 4));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockCollections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setFeaturedProducts(mockCollections[currentSlide].products.slice(0, 4));
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockCollections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockCollections.length) % mockCollections.length);
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      product,
      variant: product.variants[0],
      quantity: 1
    }));
    dispatch(addNotification({
      type: 'success',
      message: `${product.title} added to cart!`
    }));
  };

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Discover our curated selection of premium fitness equipment
          </p>
        </div>

        {/* Collection Header */}
        <div className="relative mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {mockCollections[currentSlide].title}
              </h3>
              <p className="text-secondary-600">
                {mockCollections[currentSlide].description}
              </p>
            </div>
            
            {/* Navigation */}
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Collection Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {mockCollections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-primary-600' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {product.compareAtPrice && (
                  <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    SALE
                  </div>
                )}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  <ShoppingCart className="h-4 w-4 text-secondary-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-secondary-900 mb-2 line-clamp-2">
                  {product.title}
                </h4>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-secondary-500 ml-2">(4.9)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-secondary-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-secondary-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.available 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
      onClick={handleViewAllClick}
      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
    >
      View All Products
    </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollectionSlider;