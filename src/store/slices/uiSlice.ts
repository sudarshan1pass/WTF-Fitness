import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  currentPage: 'home' | 'product' | 'collection';
  showFilters: boolean;
  viewMode: 'grid' | 'list';
  sortBy: 'default' | 'price-low' | 'price-high' | 'name' | 'newest';
  searchQuery: string;
  isMenuOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  currentPage: 'home',
  showFilters: false,
  viewMode: 'grid',
  sortBy: 'default',
  searchQuery: '',
  isMenuOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<'home' | 'product' | 'collection'>) => {
      state.currentPage = action.payload;
    },
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setShowFilters: (state, action: PayloadAction<boolean>) => {
      state.showFilters = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'default' | 'price-low' | 'price-high' | 'name' | 'newest'>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info' | 'warning'; message: string }>) => {
      const { type, message } = action.payload;
      state.notifications.push({
        id: Date.now().toString(),
        type,
        message,
        timestamp: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setCurrentPage,
  toggleFilters,
  setShowFilters,
  setViewMode,
  setSortBy,
  setSearchQuery,
  toggleMenu,
  setMenuOpen,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;