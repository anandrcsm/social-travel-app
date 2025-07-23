export interface TravelProduct {
  id: string;
  name: string;
  category: 'Bags' | 'Comfort' | 'Essentials' | 'Tech';
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  brand: string;
  affiliateLink: string;
  discount?: number;
}

export const travelProducts: TravelProduct[] = [
  // Bags Category
  {
    id: 'bag1',
    name: 'Nomad Explorer Backpack',
    category: 'Bags',
    description: 'Premium 45L travel backpack with laptop compartment and rain cover. Perfect for digital nomads and adventure travelers.',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    ],
    features: [
      'TSA-approved laptop compartment',
      'Waterproof rain cover included',
      'Comfortable padded straps',
      'Multiple organization pockets',
      'Lifetime warranty'
    ],
    specifications: {
      'Capacity': '45L',
      'Weight': '2.1 kg',
      'Dimensions': '55 x 35 x 25 cm',
      'Material': 'Recycled Nylon'
    },
    inStock: true,
    brand: 'Nomad Gear',
    affiliateLink: 'https://example.com/nomad-backpack',
    discount: 20
  },
  {
    id: 'bag2',
    name: 'Ultra Light Packing Cubes Set',
    category: 'Bags',
    description: 'Set of 6 ultra-lightweight packing cubes to organize your luggage efficiently. Made from durable ripstop fabric.',
    price: 34.99,
    rating: 4.6,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
    ],
    features: [
      '6-piece set (3 large, 2 medium, 1 small)',
      'Ultra-lightweight ripstop fabric',
      'Mesh top for visibility',
      'Two-way zippers',
      'Machine washable'
    ],
    specifications: {
      'Material': 'Ripstop Nylon',
      'Weight': '320g total',
      'Includes': '6 cubes',
      'Colors': 'Multiple options'
    },
    inStock: true,
    brand: 'TravelPro',
    affiliateLink: 'https://example.com/packing-cubes'
  },

  // Comfort Category
  {
    id: 'comfort1',
    name: 'Memory Foam Travel Pillow',
    category: 'Comfort',
    description: 'Ergonomic memory foam neck pillow with 360° support. Comes with premium travel case and eye mask.',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewCount: 256,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop'
    ],
    features: [
      '100% memory foam construction',
      '360° neck and chin support',
      'Removable washable cover',
      'Compact carrying case',
      'Free eye mask included'
    ],
    specifications: {
      'Material': 'Memory Foam',
      'Cover': 'Bamboo Fiber',
      'Dimensions': '30 x 28 x 12 cm',
      'Weight': '450g'
    },
    inStock: true,
    brand: 'ComfortZone',
    affiliateLink: 'https://example.com/travel-pillow',
    discount: 28
  },
  {
    id: 'comfort2',
    name: 'Compression Travel Socks',
    category: 'Comfort',
    description: 'Medical-grade compression socks to prevent swelling during long flights. Moisture-wicking and antibacterial.',
    price: 24.99,
    rating: 4.5,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop'
    ],
    features: [
      'Medical-grade compression (15-20 mmHg)',
      'Moisture-wicking fabric',
      'Antibacterial treatment',
      'Available in multiple sizes',
      'Seamless toe construction'
    ],
    specifications: {
      'Compression': '15-20 mmHg',
      'Material': 'Merino Wool Blend',
      'Sizes': 'S-XL available',
      'Colors': '3 color options'
    },
    inStock: true,
    brand: 'FlightFeet',
    affiliateLink: 'https://example.com/compression-socks'
  },

  // Essentials Category
  {
    id: 'essential1',
    name: 'Insulated Water Bottle 750ml',
    category: 'Essentials',
    description: 'Double-wall vacuum insulated bottle keeps drinks cold for 24h or hot for 12h. Leak-proof and BPA-free.',
    price: 39.99,
    rating: 4.9,
    reviewCount: 412,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'
    ],
    features: [
      'Double-wall vacuum insulation',
      '24h cold / 12h hot retention',
      'Leak-proof cap design',
      'BPA-free stainless steel',
      'Wide mouth for easy cleaning'
    ],
    specifications: {
      'Capacity': '750ml / 25 fl oz',
      'Material': 'Stainless Steel 18/8',
      'Dimensions': '28 x 7.5 cm',
      'Weight': '420g'
    },
    inStock: true,
    brand: 'HydroLife',
    affiliateLink: 'https://example.com/water-bottle'
  },
  {
    id: 'essential2',
    name: 'Universal Travel Adapter',
    category: 'Essentials',
    description: 'All-in-one travel adapter with 4 USB ports and Type-C. Works in 195+ countries worldwide.',
    price: 29.99,
    rating: 4.4,
    reviewCount: 167,
    images: [
      'https://images.unsplash.com/photo-1609592094214-af6bb9a29f4e?w=400&h=400&fit=crop'
    ],
    features: [
      'Works in 195+ countries',
      '4 USB-A ports + 1 USB-C',
      'Built-in safety shutters',
      'Compact foldable design',
      'LED power indicator'
    ],
    specifications: {
      'Input': '100-250V AC',
      'USB Output': '5V/2.4A max',
      'USB-C Output': '5V/3A',
      'Size': '7.5 x 5.2 x 3.1 cm'
    },
    inStock: true,
    brand: 'PowerGo',
    affiliateLink: 'https://example.com/travel-adapter'
  },

  // Tech Category
  {
    id: 'tech1',
    name: '20000mAh Portable Power Bank',
    category: 'Tech',
    description: 'High-capacity power bank with fast charging, wireless charging pad, and LED display. Airline approved.',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 298,
    images: [
      'https://images.unsplash.com/photo-1609592094214-af6bb9a29f4e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609592094214-af6bb9a29f4e?w=400&h=400&fit=crop'
    ],
    features: [
      '20000mAh high capacity',
      'Wireless charging pad',
      'Fast charging 18W PD',
      'LED digital display',
      'Airline approved'
    ],
    specifications: {
      'Capacity': '20000mAh / 74Wh',
      'Input': 'USB-C 18W PD',
      'Output': '2x USB-A + USB-C',
      'Wireless': '10W Qi charging'
    },
    inStock: true,
    brand: 'ChargeMax',
    affiliateLink: 'https://example.com/power-bank',
    discount: 20
  },
  {
    id: 'tech2',
    name: 'Noise-Canceling Travel Headphones',
    category: 'Tech',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery, and travel case.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 523,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    ],
    features: [
      'Active noise cancellation',
      '30-hour battery life',
      'Quick charge (10 min = 3 hours)',
      'Premium travel case',
      'Multi-device pairing'
    ],
    specifications: {
      'Battery': '30 hours (ANC on)',
      'Charging': 'USB-C fast charge',
      'Frequency': '20Hz - 20kHz',
      'Weight': '250g'
    },
    inStock: true,
    brand: 'SoundWave',
    affiliateLink: 'https://example.com/headphones',
    discount: 20
  },
  {
    id: 'tech3',
    name: 'Travel Cable Organizer',
    category: 'Tech',
    description: 'Premium leather cable organizer with multiple compartments for cables, chargers, and small electronics.',
    price: 34.99,
    rating: 4.3,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1609592094214-af6bb9a29f4e?w=400&h=400&fit=crop'
    ],
    features: [
      'Premium vegan leather',
      'Multiple elastic loops',
      'Zippered mesh pocket',
      'Compact roll-up design',
      'Water-resistant lining'
    ],
    specifications: {
      'Material': 'Vegan Leather',
      'Dimensions': '23 x 15 cm (open)',
      'Pockets': '8 elastic loops + mesh',
      'Colors': 'Black, Brown, Navy'
    },
    inStock: true,
    brand: 'OrganiTech',
    affiliateLink: 'https://example.com/cable-organizer'
  }
];

export const productCategories = [
  { id: 'all', name: 'All Items', icon: '🎒' },
  { id: 'Bags', name: 'Bags & Luggage', icon: '👜' },
  { id: 'Comfort', name: 'Comfort', icon: '😴' },
  { id: 'Essentials', name: 'Essentials', icon: '🔧' },
  { id: 'Tech', name: 'Tech', icon: '📱' }
];