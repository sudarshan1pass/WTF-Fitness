import { ShoppingCart, Search, Menu, X, User, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { toggleMenu, setSearchQuery } from '../store/slices/uiSlice';
import { toggleCart } from '../store/slices/cartSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isMenuOpen, searchQuery } = useAppSelector(state => state.ui);
  const { itemCount } = useAppSelector(state => state.cart);

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Strength Training', href: '#strength' },
    { name: 'Cardio', href: '#cardio' },
    { name: 'Accessories', href: '#accessories' },
    { name: 'Sale', href: '#sale' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              WTF <span className="text-secondary-600">Fitness</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-secondary-600 hover:text-primary-600 transition-colors duration-200">
              <MapPin className="h-6 w-6" />
            </button>
            <button className="text-secondary-600 hover:text-primary-600 transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => dispatch(toggleMenu())}
              className="md:hidden text-secondary-600 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 rounded-md"
                  onClick={() => dispatch(toggleMenu())}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-6 top-4.5 h-5 w-5 text-secondary-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;