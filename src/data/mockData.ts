import { Product, Collection, Location } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Professional Olympic Barbell Set',
    price: 599.99,
    compareAtPrice: 799.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '1-1', title: '45lb Standard', price: 599.99, available: true },
      { id: '1-2', title: '35lb Women\'s', price: 549.99, available: true },
    ],
    tags: ['strength', 'olympic', 'barbell'],
    available: true,
    description: 'Professional-grade Olympic barbell set perfect for serious strength training. Made from high-quality steel with precise knurling for optimal grip.',
    vendor: 'WTF Fitness',
    type: 'Strength Equipment',
  },
  {
    id: '2',
    title: 'Adjustable Dumbbells Pro',
    price: 299.99,
    compareAtPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '2-1', title: '5-50lbs', price: 299.99, available: true, color: 'Black' },
      { id: '2-2', title: '5-70lbs', price: 399.99, available: true, color: 'Black' },
      { id: '2-3', title: '5-50lbs', price: 329.99, available: false, color: 'Red' },
    ],
    tags: ['dumbbells', 'adjustable', 'home-gym'],
    available: true,
    description: 'Space-saving adjustable dumbbells that replace an entire rack. Quick-change weight system for efficient workouts.',
    vendor: 'WTF Fitness',
    type: 'Dumbbells',
  },
  {
    id: '3',
    title: 'Premium Resistance Bands Set',
    price: 49.99,
    compareAtPrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '3-1', title: 'Light Resistance', price: 39.99, available: true, color: 'Green' },
      { id: '3-2', title: 'Medium Resistance', price: 49.99, available: true, color: 'Blue' },
      { id: '3-3', title: 'Heavy Resistance', price: 59.99, available: true, color: 'Red' },
    ],
    tags: ['resistance', 'bands', 'portable', 'cardio'],
    available: true,
    description: 'Complete resistance bands set with multiple resistance levels. Perfect for home workouts and travel.',
    vendor: 'FlexFit',
    type: 'Accessories',
  },
  {
    id: '4',
    title: 'Smart Fitness Tracker Pro',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '4-1', title: 'Black', price: 199.99, available: true, color: 'Black' },
      { id: '4-2', title: 'White', price: 199.99, available: true, color: 'White' },
      { id: '4-3', title: 'Blue', price: 199.99, available: false, color: 'Blue' },
    ],
    tags: ['technology', 'tracker', 'smart', 'fitness'],
    available: true,
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and comprehensive workout analytics.',
    vendor: 'TechFit',
    type: 'Technology',
  },
  {
    id: '5',
    title: 'Professional Kettlebell Set',
    price: 149.99,
    compareAtPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '5-1', title: '15lb', price: 49.99, available: true },
      { id: '5-2', title: '25lb', price: 79.99, available: true },
      { id: '5-3', title: '35lb', price: 99.99, available: true },
    ],
    tags: ['kettlebell', 'strength', 'functional'],
    available: true,
    description: 'Cast iron kettlebells with wide handles for comfortable grip during high-intensity workouts.',
    vendor: 'WTF Fitness',
    type: 'Strength Equipment',
  },
  {
    id: '6',
    title: 'Yoga Mat Premium',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '6-1', title: 'Purple', price: 79.99, available: true, color: 'Purple' },
      { id: '6-2', title: 'Blue', price: 79.99, available: true, color: 'Blue' },
      { id: '6-3', title: 'Pink', price: 79.99, available: true, color: 'Pink' },
    ],
    tags: ['yoga', 'mat', 'flexibility', 'meditation'],
    available: true,
    description: 'Extra-thick yoga mat with superior grip and cushioning for all types of yoga practice.',
    vendor: 'ZenFit',
    type: 'Accessories',
  },
  {
    id: '7',
    title: 'Power Rack Station',
    price: 899.99,
    compareAtPrice: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '7-1', title: 'Standard Height', price: 899.99, available: true },
      { id: '7-2', title: 'Tall Height', price: 999.99, available: true },
    ],
    tags: ['power-rack', 'strength', 'squat', 'safety'],
    available: true,
    description: 'Heavy-duty power rack with safety bars, pull-up bar, and multiple attachment points for comprehensive strength training.',
    vendor: 'WTF Fitness',
    type: 'Strength Equipment',
  },
  {
    id: '8',
    title: 'Foam Roller Pro',
    price: 39.99,
    compareAtPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '8-1', title: 'Medium Density', price: 39.99, available: true },
      { id: '8-2', title: 'High Density', price: 49.99, available: true },
    ],
    tags: ['recovery', 'foam-roller', 'massage', 'flexibility'],
    available: true,
    description: 'High-density foam roller for muscle recovery and myofascial release. Perfect for post-workout recovery.',
    vendor: 'RecoverFit',
    type: 'Recovery',
  },
  {
    id: '9',
    title: 'Battle Ropes Heavy Duty',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '9-1', title: '30ft x 1.5"', price: 129.99, available: true },
      { id: '9-2', title: '40ft x 2"', price: 179.99, available: true },
    ],
    tags: ['battle-ropes', 'cardio', 'hiit', 'functional'],
    available: true,
    description: 'Heavy-duty battle ropes for high-intensity interval training and functional fitness workouts.',
    vendor: 'CardioMax',
    type: 'Cardio Equipment',
  },
  {
    id: '10',
    title: 'Medicine Ball Set',
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
    ],
    variants: [
      { id: '10-1', title: '6lb', price: 29.99, available: true },
      { id: '10-2', title: '10lb', price: 39.99, available: true },
      { id: '10-3', title: '15lb', price: 49.99, available: true },
    ],
    tags: ['medicine-ball', 'functional', 'core', 'strength'],
    available: true,
    description: 'Textured medicine balls for functional training, core workouts, and explosive power development.',
    vendor: 'FuncFit',
    type: 'Functional Training',
  },
];

export const mockCollections: Collection[] = [
  {
    id: 'strength',
    title: 'Strength Training',
    description: 'Build serious muscle with our professional-grade strength equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop&crop=center',
    products: mockProducts.filter(p => p.tags.includes('strength') || p.tags.includes('dumbbells') || p.tags.includes('kettlebell') || p.tags.includes('power-rack')),
  },
  {
    id: 'cardio',
    title: 'Cardio Equipment',
    description: 'Get your heart pumping with our premium cardio solutions',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&crop=center',
    products: mockProducts.filter(p => p.tags.includes('cardio') || p.tags.includes('resistance') || p.tags.includes('battle-ropes')),
  },
  {
    id: 'accessories',
    title: 'Fitness Accessories',
    description: 'Complete your workout with essential fitness accessories',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&h=600&fit=crop&crop=center',
    products: mockProducts.filter(p => p.type === 'Accessories' || p.type === 'Technology' || p.type === 'Recovery' || p.type === 'Functional Training'),
  },
];

export const mockLocations: Location[] = [
  {
    id: 'downtown',
    name: 'WTF Fitness Downtown',
    address: '123 Main St, Downtown',
    lat: 40.7128,
    lng: -74.0060,
    inventory: {
      '1': 5, '2': 8, '3': 12, '4': 3, '5': 7,
      '6': 15, '7': 2, '8': 25, '9': 4, '10': 18,
    },
  },
  {
    id: 'uptown',
    name: 'WTF Fitness Uptown',
    address: '456 Broadway, Uptown',
    lat: 40.7831,
    lng: -73.9712,
    inventory: {
      '1': 2, '2': 15, '3': 20, '4': 7, '5': 12,
      '6': 8, '7': 5, '8': 30, '9': 6, '10': 22,
    },
  },
  {
    id: 'westside',
    name: 'WTF Fitness West Side',
    address: '789 West Ave, West Side',
    lat: 40.7589,
    lng: -73.9851,
    inventory: {
      '1': 0, '2': 5, '3': 8, '4': 12, '5': 3,
      '6': 20, '7': 1, '8': 15, '9': 8, '10': 10,
    },
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Personal Trainer',
    content: 'WTF Fitness has the best quality equipment I\'ve ever used. My clients love the results they get with their gear.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'Competitive Bodybuilder',
    content: 'Professional grade equipment at amazing prices. The adjustable dumbbells saved so much space in my home gym.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Fitness Enthusiast',
    content: 'Customer service is incredible and the quality is unmatched. I\'ve recommended WTF Fitness to all my friends.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    rating: 5,
  },
];