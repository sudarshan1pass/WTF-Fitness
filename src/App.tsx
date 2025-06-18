import { useState } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { setCurrentPage } from './store/slices/uiSlice';
import { toggleCart } from './store/slices/cartSlice';
import { Provider } from 'react-redux';
import { store } from './store';
import HeroBanner from './components/HeroBanner';
import FeaturedCollectionSlider from './components/FeaturedCollectionSlider';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import CollectionPage from './components/CollectionPage';
import ProductPage from './components/ProductPage';
import CartSidebar from './components/CartSidebar';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(state => state.ui);
   const { itemCount } = useAppSelector(state => state.cart);
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   
  

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return <ProductPage />;
      case 'collection':
        return <CollectionPage />;
      case 'home':
      default:
        return (
          <>
            <HeroBanner />
            <FeaturedCollectionSlider />
            <TestimonialsCarousel />
             <CartSidebar /> 
          </>
        );
    }
  };

  return (
    // <div className="min-h-screen bg-white">
    //   <Header />
      
    //   {/* Demo Navigation */}
    //   <div className="bg-primary-600 text-white">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
    //       <div className="flex items-center justify-center space-x-6 text-sm">
    //         {/* <span className="font-medium">Demo Pages:</span> */}
    //         <button
    //           onClick={() => dispatch(setCurrentPage('home'))}
    //           className={`px-3 py-1 rounded ${currentPage === 'home' ? 'bg-primary-700' : 'hover:bg-primary-700'}`}
    //         >
    //           Homepage
    //         </button>
    //         <button
    //           onClick={() => dispatch(setCurrentPage('product'))}
    //           className={`px-3 py-1 rounded ${currentPage === 'product' ? 'bg-primary-700' : 'hover:bg-primary-700'}`}
    //         >
    //           Product Page
    //         </button>
    //         <button
    //           onClick={() => dispatch(setCurrentPage('collection'))}
    //           className={`px-3 py-1 rounded ${currentPage === 'collection' ? 'bg-primary-700' : 'hover:bg-primary-700'}`}
    //         >
    //           Collection Page
    //         </button>
    //       <button 
    //           onClick={() => dispatch(toggleCart())}
    //           className="relative text-secondary-600 hover:text-primary-600 transition-colors duration-200"
    //         >
    //           <ShoppingCart className="h-6 w-6" />
    //           {itemCount > 0 && (
    //             <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    //               {itemCount}
    //             </span>
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Price Manager - Only show on home page */}
    //   {currentPage === 'home' && (
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //       {/* <Price Manager /> */}
    //     </div>
    //   )}

    //   {renderPage()}
    //   <Footer />
    //   <NotificationSystem />
    //   <CartSidebar />
    // </div>
     <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary-600">
              WTF <span className="text-secondary-600">Fitness</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              {['home', 'product', 'collection'].map((page) => (
                <button
                  key={page}
                  onClick={() => dispatch(setCurrentPage(page as any))}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  {page === 'home'
                    ? 'Homepage'
                    : page === 'product'
                    ? 'Product Page'
                    : 'Collection Page'}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center max-w-md flex-1 mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
              </div>
            </div>

            {/* ✅ Cart Sidebar Toggle */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative text-secondary-600 hover:text-primary-600 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ?<X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4">
              {['home', 'product', 'collection'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    dispatch(setCurrentPage(page as any));
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  {page === 'home'
                    ? 'Homepage'
                    : page === 'product'
                    ? 'Product Page'
                    : 'Collection Page'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Page Render */}
      {renderPage()}
      <CartSidebar />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;