import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import { mockProducts } from '../../data/mockData';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  priceHistory: Record<string, { oldPrice: number; newPrice: number; timestamp: number }[]>;
}

const initialState: ProductsState = {
  products: mockProducts,
  loading: false,
  error: null,
  priceHistory: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProductPrice: (state, action: PayloadAction<{ productId: string; newPrice: number }>) => {
      const { productId, newPrice } = action.payload;
      const product = state.products.find(p => p.id === productId);
      
      if (product) {
        const oldPrice = product.price;
        
        // Update price history
        if (!state.priceHistory[productId]) {
          state.priceHistory[productId] = [];
        }
        
        state.priceHistory[productId].push({
          oldPrice,
          newPrice,
          timestamp: Date.now(),
        });
        
        // Update product price
        product.price = newPrice;
        
        // Update variant prices proportionally
        const priceRatio = newPrice / oldPrice;
        product.variants.forEach(variant => {
          variant.price = Math.round(variant.price * priceRatio * 100) / 100;
        });
      }
    },
    increasePrice: (state, action: PayloadAction<{ productId: string; percentage: number }>) => {
      const { productId, percentage } = action.payload;
      const product = state.products.find(p => p.id === productId);
      
      if (product) {
        const newPrice = Math.round(product.price * (1 + percentage / 100) * 100) / 100;
        productsSlice.caseReducers.updateProductPrice(state, {
          type: 'products/updateProductPrice',
          payload: { productId, newPrice },
        });
      }
    },
    decreasePrice: (state, action: PayloadAction<{ productId: string; percentage: number }>) => {
      const { productId, percentage } = action.payload;
      const product = state.products.find(p => p.id === productId);
      
      if (product) {
        const newPrice = Math.round(product.price * (1 - percentage / 100) * 100) / 100;
        productsSlice.caseReducers.updateProductPrice(state, {
          type: 'products/updateProductPrice',
          payload: { productId, newPrice },
        });
      }
    },
    bulkUpdatePrices: (state, action: PayloadAction<{ percentage: number; increase: boolean }>) => {
      const { percentage, increase } = action.payload;
      
      state.products.forEach(product => {
        const multiplier = increase ? (1 + percentage / 100) : (1 - percentage / 100);
        const newPrice = Math.round(product.price * multiplier * 100) / 100;
        
        productsSlice.caseReducers.updateProductPrice(state, {
          type: 'products/updateProductPrice',
          payload: { productId: product.id, newPrice },
        });
      });
    },
    resetPrices: (state) => {
      state.products = mockProducts;
      state.priceHistory = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  updateProductPrice,
  increasePrice,
  decreasePrice,
  bulkUpdatePrices,
  resetPrices,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;