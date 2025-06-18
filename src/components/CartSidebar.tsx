import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { removeFromCart, updateQuantity, clearCart, toggleCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/uiSlice';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const { items, total, itemCount, isOpen } = useAppSelector(state => state.cart);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart({ productId, variantId }));
      dispatch(addNotification({
        type: 'info',
        message: 'Item removed from cart'
      }));
    } else {
      dispatch(updateQuantity({ productId, variantId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string, variantId: string, productTitle: string) => {
    dispatch(removeFromCart({ productId, variantId }));
    dispatch(addNotification({
      type: 'success',
      message: `${productTitle} removed from cart`
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(addNotification({
      type: 'info',
      message: 'Cart cleared'
    }));
  };

  const handleCheckout = () => {
    dispatch(addNotification({
      type: 'success',
      message: 'Proceeding to checkout...'
    }));
    // Here you would typically redirect to checkout page
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={() => dispatch(toggleCart())}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-bold text-secondary-900">
              Shopping Cart ({itemCount})
            </h2>
          </div>
          <button
            onClick={() => dispatch(toggleCart())}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-secondary-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900 mb-2">Your cart is empty</h3>
              <p className="text-secondary-600 mb-6">Add some products to get started!</p>
              <button
                onClick={() => dispatch(toggleCart())}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="bg-secondary-50 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary-900 text-sm line-clamp-2 mb-1">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-secondary-600 mb-2">
                        {item.variant.title}
                        {item.variant.color && ` • ${item.variant.color}`}
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-primary-600">
                          {formatPrice(item.variant.price)}
                        </span>
                        <span className="text-sm text-secondary-600">
                          Total: {formatPrice(item.variant.price * item.quantity)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.variant.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4 text-secondary-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-secondary-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.variant.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border border-secondary-300 flex items-center justify-center hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4 text-secondary-600" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.variant.id, item.product.title)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-2 transition-colors duration-200"
                >
                  Clear All Items
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-secondary-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-secondary-900">Subtotal:</span>
              <span className="font-bold text-primary-600">{formatPrice(total)}</span>
            </div>

            {/* Shipping Info */}
            <div className="text-sm text-secondary-600 bg-primary-50 p-3 rounded-lg">
              <p className="flex items-center justify-between">
                <span>Shipping:</span>
                <span className="font-medium text-primary-600">
                  {total >= 199 ? 'FREE' : formatPrice(19.99)}
                </span>
              </p>
              {total < 199 && (
                <p className="text-xs mt-1">
                  Add {formatPrice(199 - total)} more for free shipping!
                </p>
              )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-xl border-t border-secondary-200 pt-4">
              <span className="font-bold text-secondary-900">Total:</span>
              <span className="font-bold text-primary-600">
                {formatPrice(total + (total >= 199 ? 0 : 19.99))}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </button>
              <button
                onClick={() => dispatch(toggleCart())}
                className="w-full border border-secondary-300 text-secondary-700 hover:bg-secondary-50 py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;