import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, MapPin, Truck, Shield, RefreshCw } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useInventory } from '../hooks/useInventory';
import { useAppDispatch } from '../hooks/useRedux';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/uiSlice';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const product = mockProducts[0]; // Olympic Barbell Set
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { nearestLocation, inventory, loading } = useInventory(product.id);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const frequentlyBoughtTogether = mockProducts.slice(1, 4); // Related products

  const handleAddToCart = () => {
    dispatch(addToCart({
      product,
      variant: selectedVariant,
      quantity
    }));
    dispatch(addNotification({
      type: 'success',
      message: `${quantity}x ${product.title} added to cart!`
    }));
  };

  const handleAddAllToCart = () => {
    // Add main product
    dispatch(addToCart({
      product,
      variant: selectedVariant,
      quantity: 1
    }));

    // Add frequently bought together items
    frequentlyBoughtTogether.slice(0, 2).forEach(item => {
      dispatch(addToCart({
        product: item,
        variant: item.variants[0],
        quantity: 1
      }));
    });

    dispatch(addNotification({
      type: 'success',
      message: 'Bundle added to cart!'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <a href="#" className="text-secondary-500 hover:text-primary-600">Home</a>
          <span className="mx-2 text-secondary-400">/</span>
          <a href="#" className="text-secondary-500 hover:text-primary-600">Strength Training</a>
          <span className="mx-2 text-secondary-400">/</span>
          <span className="text-secondary-900">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                    selectedImage === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt="" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-secondary-600">(4.9) • 248 reviews</span>
                </div>
                <span className="text-secondary-400">|</span>
                <span className="text-primary-600 font-medium">SKU: {product.id}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-secondary-900">
                  {formatPrice(selectedVariant.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-secondary-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Save {Math.round(((product.compareAtPrice - selectedVariant.price) / product.compareAtPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Select Variant</h3>
              <div className="space-y-2">
                {product.variants.map((variant) => (
                  <label
                    key={variant.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedVariant.id === variant.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-secondary-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="variant"
                        checked={selectedVariant.id === variant.id}
                        onChange={() => setSelectedVariant(variant)}
                        className="sr-only"
                      />
                      <span className="font-medium">{variant.title}</span>
                    </div>
                    <span className="font-semibold">{formatPrice(variant.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location & Inventory */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-5 w-5 text-primary-600" />
                <span className="font-semibold text-secondary-900">Local Availability</span>
              </div>
              {loading ? (
                <p className="text-secondary-600">Checking local inventory...</p>
              ) : nearestLocation && inventory > 0 ? (
                <div>
                  <p className="text-secondary-700">
                    <span className="font-semibold text-primary-600">{inventory} units</span> available at{' '}
                    <span className="font-medium">{nearestLocation.name}</span>
                  </p>
                  <p className="text-sm text-secondary-600">{nearestLocation.address}</p>
                </div>
              ) : (
                <p className="text-secondary-600">Check online availability only</p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-secondary-300 flex items-center justify-center hover:bg-secondary-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                  <Heart className="h-6 w-6 text-secondary-600" />
                </button>
                <button className="p-3 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
                  <Share2 className="h-6 w-6 text-secondary-600" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-secondary-200">
              <div className="text-center">
                <Truck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-secondary-900">Free Shipping</p>
                <p className="text-xs text-secondary-600">On orders $199+</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-secondary-900">2 Year Warranty</p>
                <p className="text-xs text-secondary-600">Full coverage</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-secondary-900">30-Day Returns</p>
                <p className="text-xs text-secondary-600">No questions asked</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Frequently Bought Together</h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <div className="text-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                  loading="lazy"
                />
                <p className="text-sm font-medium">{product.title}</p>
                <p className="text-primary-600 font-semibold">{formatPrice(product.price)}</p>
              </div>
              
              <div className="text-center text-2xl text-secondary-400">+</div>
              
              {frequentlyBoughtTogether.slice(0, 2).map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className="text-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                      loading="lazy"
                    />
                    <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                    <p className="text-primary-600 font-semibold">{formatPrice(item.price)}</p>
                  </div>
                  {index === 0 && <div className="text-center text-2xl text-secondary-400">+</div>}
                </React.Fragment>
              ))}
            </div>
            
            <div className="border-t border-secondary-200 mt-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-600">Total Price:</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {formatPrice(
                      product.price + frequentlyBoughtTogether.slice(0, 2).reduce((sum, item) => sum + item.price, 0)
                    )}
                  </p>
                </div>
                <button 
                  onClick={handleAddAllToCart}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-secondary-700 leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-secondary-700 leading-relaxed">
              Engineered for both commercial and home gym use, this Olympic barbell features precision-machined sleeves that rotate smoothly on bronze bushings. The aggressive knurling provides a secure grip without being overly harsh on your hands, making it perfect for both Olympic lifts and powerlifting movements.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;