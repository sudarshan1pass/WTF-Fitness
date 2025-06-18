import { useState } from 'react';
import { TrendingUp, TrendingDown, RotateCcw, DollarSign, History } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { increasePrice, decreasePrice, bulkUpdatePrices, resetPrices } from '../store/slices/productsSlice';
import { addNotification } from '../store/slices/uiSlice';

const PriceManager = () => {
  const dispatch = useAppDispatch();
  const { products, priceHistory } = useAppSelector(state => state.products);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [percentage, setPercentage] = useState(10);
  const [bulkPercentage, setBulkPercentage] = useState(5);
  const [showHistory, setShowHistory] = useState(false);

  const handleSinglePriceIncrease = () => {
    if (!selectedProduct) {
      dispatch(addNotification({ type: 'error', message: 'Please select a product' }));
      return;
    }

    dispatch(increasePrice({ productId: selectedProduct, percentage }));
    dispatch(addNotification({ 
      type: 'success', 
      message: `Price increased by ${percentage}% for selected product` 
    }));
  };

  const handleSinglePriceDecrease = () => {
    if (!selectedProduct) {
      dispatch(addNotification({ type: 'error', message: 'Please select a product' }));
      return;
    }

    dispatch(decreasePrice({ productId: selectedProduct, percentage }));
    dispatch(addNotification({ 
      type: 'success', 
      message: `Price decreased by ${percentage}% for selected product` 
    }));
  };

  const handleBulkPriceIncrease = () => {
    dispatch(bulkUpdatePrices({ percentage: bulkPercentage, increase: true }));
    dispatch(addNotification({ 
      type: 'success', 
      message: `All prices increased by ${bulkPercentage}%` 
    }));
  };

  const handleBulkPriceDecrease = () => {
    dispatch(bulkUpdatePrices({ percentage: bulkPercentage, increase: false }));
    dispatch(addNotification({ 
      type: 'success', 
      message: `All prices decreased by ${bulkPercentage}%` 
    }));
  };

  const handleResetPrices = () => {
    dispatch(resetPrices());
    dispatch(addNotification({ 
      type: 'info', 
      message: 'All prices reset to original values' 
    }));
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const selectedProductData = products.find(p => p.id === selectedProduct);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <DollarSign className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-secondary-900">Price Manager</h2>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
        >
          <History className="h-5 w-5" />
          <span>Price History</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Single Product Price Management */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-secondary-900">Individual Product</h3>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Choose a product...</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.title} - {formatPrice(product.price)}
                </option>
              ))}
            </select>
          </div>

          {selectedProductData && (
            <div className="bg-secondary-50 p-4 rounded-lg">
              <h4 className="font-medium text-secondary-900 mb-2">Current Product Info</h4>
              <p className="text-secondary-700">
                <span className="font-medium">Price:</span> {formatPrice(selectedProductData.price)}
              </p>
              <p className="text-secondary-700">
                <span className="font-medium">Variants:</span> {selectedProductData.variants.length}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Percentage Change
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              min="1"
              max="100"
              className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSinglePriceIncrease}
              disabled={!selectedProduct}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-secondary-300 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Increase
            </button>
            <button
              onClick={handleSinglePriceDecrease}
              disabled={!selectedProduct}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-secondary-300 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Decrease
            </button>
          </div>
        </div>

        {/* Bulk Price Management */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-secondary-900">Bulk Operations</h3>
          
          <div className="bg-accent-50 p-4 rounded-lg">
            <p className="text-accent-800 text-sm">
              <strong>Warning:</strong> Bulk operations will affect all {products.length} products in the catalog.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Bulk Percentage Change
            </label>
            <input
              type="number"
              value={bulkPercentage}
              onChange={(e) => setBulkPercentage(Number(e.target.value))}
              min="1"
              max="50"
              className="w-full border border-secondary-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleBulkPriceIncrease}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Bulk Increase
            </button>
            <button
              onClick={handleBulkPriceDecrease}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Bulk Decrease
            </button>
          </div>

          <button
            onClick={handleResetPrices}
            className="w-full bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset All Prices
          </button>
        </div>
      </div>

      {/* Price History */}
      {showHistory && (
        <div className="mt-8 border-t border-secondary-200 pt-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Price History</h3>
          {Object.keys(priceHistory).length === 0 ? (
            <p className="text-secondary-500">No price changes recorded yet.</p>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {Object.entries(priceHistory).map(([productId, history]) => {
                const product = products.find(p => p.id === productId);
                return (
                  <div key={productId} className="bg-secondary-50 p-4 rounded-lg">
                    <h4 className="font-medium text-secondary-900 mb-2">
                      {product?.title || `Product ${productId}`}
                    </h4>
                    <div className="space-y-1">
                      {history.slice(-3).map((change, index) => (
                        <div key={index} className="text-sm text-secondary-600 flex justify-between">
                          <span>
                            {formatPrice(change.oldPrice)} → {formatPrice(change.newPrice)}
                          </span>
                          <span>
                            {new Date(change.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceManager;