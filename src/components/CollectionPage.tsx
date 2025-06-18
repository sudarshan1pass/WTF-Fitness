import { useState, useMemo } from 'react';
import { Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setViewMode, setSortBy, toggleFilters } from '../store/slices/uiSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/uiSlice';

type SortOption = 'default' | 'price-low' | 'price-high' | 'name' | 'newest';

const CollectionPage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.products);
  const { viewMode, sortBy, showFilters } = useAppSelector(state => state.ui);
  
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    tags: [] as string[],
    availability: 'all', // 'all', 'in-stock', 'out-of-stock'
    vendor: 'all',
  });

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  // Get unique values for filters
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [products]);

  const allVendors = useMemo(() => {
    const vendors = new Set<string>();
    products.forEach(product => vendors.add(product.vendor));
    return Array.from(vendors);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
        return false;
      }

      // Availability filter
      if (filters.availability === 'in-stock' && !product.available) {
        return false;
      }
      if (filters.availability === 'out-of-stock' && product.available) {
        return false;
      }

      // Vendor filter
      if (filters.vendor !== 'all' && product.vendor !== filters.vendor) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        // For demo purposes, reverse the default order
        filtered.reverse();
        break;
      default:
        // Keep default order
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleTagFilter = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      tags: [],
      availability: 'all',
      vendor: 'all',
    });
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">All Products</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <p className="text-secondary-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border border-secondary-300 rounded-lg">
                <button
                  onClick={() => dispatch(setViewMode('grid'))}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-secondary-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => dispatch(setViewMode('list'))}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-secondary-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
                className="border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="default">Sort by Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="newest">Newest First</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => dispatch(toggleFilters())}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-secondary-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-secondary-600">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-medium text-secondary-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleTagFilter(tag)}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700 capitalize">
                        {tag.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="font-medium text-secondary-900 mb-3">Availability</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'in-stock', label: 'In Stock' },
                    { value: 'out-of-stock', label: 'Out of Stock' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="availability"
                        value={option.value}
                        checked={filters.availability === option.value}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          availability: e.target.value
                        }))}
                        className="border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-secondary-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vendor */}
              <div>
                <h3 className="font-medium text-secondary-900 mb-3">Brand</h3>
                <select
                  value={filters.vendor}
                  onChange={(e) => setFilters(prev => ({ ...prev, vendor: e.target.value }))}
                  className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Brands</option>
                  {allVendors.map(vendor => (
                    <option key={vendor} value={vendor}>{vendor}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                      <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      
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
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                  >
                    <div className="flex space-x-6">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                          {product.title}
                        </h3>
                        
                        <p className="text-secondary-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-secondary-500 ml-2">(4.9) • 248 reviews</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-secondary-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-lg text-secondary-500 line-through">
                                {formatPrice(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              product.available 
                                ? 'bg-primary-100 text-primary-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.available ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <button 
                              onClick={() => handleAddToCart(product)}
                              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center"
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-secondary-100 hover:bg-secondary-200 text-secondary-800 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Load More Products
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary-500 text-lg mb-4">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;