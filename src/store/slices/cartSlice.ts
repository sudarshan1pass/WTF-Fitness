import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product, ProductVariant } from '../../types/product';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; variant: ProductVariant; quantity: number }>) => {
      const { product, variant, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, variant, quantity });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; variantId: string }>) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        item => !(item.product.id === productId && item.variant.id === variantId)
      );
      cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; variantId: string; quantity: number }>) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(
        item => item.product.id === productId && item.variant.id === variantId
      );

      if (item) {
        if (quantity <= 0) {
          cartSlice.caseReducers.removeFromCart(state, {
            type: 'cart/removeFromCart',
            payload: { productId, variantId },
          });
        } else {
          item.quantity = quantity;
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    calculateTotals: (state) => {
      state.total = state.items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
      state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;