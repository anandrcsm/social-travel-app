import { User, TravelCard, Experience, Story, Moment, Chat, ExperienceMoment } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Wanderlust Explorer',
    username: 'wanderlust_exp',
    profilePic: 'https://placehold.co/100x100/A78BFA/ffffff?text=WE',
    bio: 'Sharing my adventures one Travel Card at a time! 🌍✈️ Digital nomad • 25 countries and counting',
    countries: 25,
    cities: 87,
    trips: 18,
    isCreator: true,
    badges: ['Top Creator', 'Adventure Seeker', 'Cultural Explorer'],
  },
  {
    id: 'user2',
    name: 'Foodie Traveler',
    username: 'foodie_travels',
    profilePic: 'https://placehold.co/100x100/FDBA74/ffffff?text=FT',
    bio: 'Eating my way around the world! 🍜🍣 Food blogger • Restaurant reviews • Hidden gems',
    countries: 15,
    cities: 45,
    trips: 12,
    isCreator: true,
    badges: ['Food Critic', 'Rising Star', 'Local Expert'],
  },
  {
    id: 'user3',
    name: 'Urban Wanderer',
    username: 'urban_wanderer',
    profilePic: 'https://placehold.co/100x100/93C5FD/ffffff?text=UW',
    bio: 'Discovering hidden gems in every city. 🏙️ Architecture enthusiast • Street art lover',
    countries: 8,
    cities: 32,
    trips: 9,
    isCreator: false,
    badges: ['City Explorer'],
  },
  {
    id: 'user4',
    name: 'Adventure Seeker',
    username: 'adventure_seeker',
    profilePic: 'https://placehold.co/100x100/FDA47A/ffffff?text=AG',
    bio: 'Chasing thrills and breathtaking views! 🏞️ Extreme sports • Mountain climbing • Skydiving',
    countries: 20,
    cities: 55,
    trips: 16,
    isCreator: true,
    badges: ['Explorer', 'Thrill Seeker', 'Mountain Master'],
  },
  {
    id: 'user5',
    name: 'Relax & Recharge',
    username: 'zen_traveler',
    profilePic: 'https://placehold.co/100x100/D8B4FE/ffffff?text=ZT',
    bio: 'Finding peace in every journey. 🧘‍♀️ Wellness retreats • Meditation • Yoga',
    countries: 12,
    cities: 28,
    trips: 11,
    isCreator: false,
    badges: ['Wellness Guru'],
  },
  {
    id: 'user6',
    name: 'Solo Voyager',
    username: 'solo_explorer',
    profilePic: 'https://placehold.co/100x100/F87171/ffffff?text=SV',
    bio: 'Empowering solo travel adventures! 👤 Safety tips • Budget travel • Solo female travel',
    countries: 30,
    cities: 95,
    trips: 22,
    isCreator: true,
    badges: ['Solo Expert', 'Safety Ambassador', 'Budget Master'],
  },
  {
    id: 'user7',
    name: 'Culture Curator',
    username: 'culture_lens',
    profilePic: 'https://placehold.co/100x100/34D399/ffffff?text=CC',
    bio: 'Documenting world cultures through my lens. 📸 Cultural photography • Traditional festivals',
    countries: 35,
    cities: 120,
    trips: 28,
    isCreator: true,
    badges: ['Cultural Ambassador', 'Top Creator', 'Festival Expert'],
  },
  {
    id: 'user8',
    name: 'Beach Hopper',
    username: 'beach_life',
    profilePic: 'https://placehold.co/100x100/60A5FA/ffffff?text=BH',
    bio: 'Living the beach life one shore at a time! 🏖️ Coastal adventures • Island hopping',
    countries: 18,
    cities: 40,
    trips: 14,
    isCreator: true,
    badges: ['Island Expert', 'Beach Lover'],
  }
];

// Expanded experiences
export const mockExperiences: Experience[] = [
  // Bali Experiences
  {
    id: 'exp1',
    title: 'Ubud Jungle Villa',
    category: 'Accommodation',
    media: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=500&fit=crop'
    ],
    rating: 4.8,
    review: 'Stunning views and incredible service. A true jungle paradise! The infinity pool overlooking the valley was absolutely breathtaking. The staff went above and beyond to make our stay memorable. The traditional Balinese architecture combined with modern amenities created the perfect luxury retreat.',
    location: 'Ubud, Bali',
    cost: 250,
    affiliateLink: 'https://example.com/ubud-villa',
  },
  {
    id: 'exp2',
    title: 'Sisterfields Café',
    category: 'Food',
    media: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=400&h=500&fit=crop'
    ],
    rating: 4.5,
    review: 'Best brunch in Seminyak! Highly recommend the smoothie bowls. The açai bowl was fresh and delicious, and the avocado toast was perfectly seasoned. Great atmosphere and friendly staff.',
    location: 'Seminyak, Bali',
    cost: 20,
    affiliateLink: 'https://example.com/sisterfields',
  },
  {
    id: 'exp3',
    title: 'Mount Batur Sunrise Trek',
    category: 'Activities',
    media: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop'
    ],
    rating: 4.9,
    review: 'Challenging but rewarding. The sunrise view was absolutely unforgettable! Started the trek at 3:30 AM in complete darkness, but reaching the summit just as the sun painted the sky in brilliant colors made every step worth it.',
    location: 'Kintamani, Bali',
    cost: 40,
    affiliateLink: 'https://example.com/mt-batur',
  },
  {
    id: 'exp4',
    title: 'Full Moon Beach Party',
    category: 'Events',
    media: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
    ],
    rating: 4.2,
    review: 'Great vibes and music right on the beach. A must-do for nightlife! The energy was electric with people from all over the world coming together to dance under the full moon.',
    location: 'Koh Phangan, Thailand',
    cost: 15,
    affiliateLink: 'https://example.com/full-moon-party',
  },
  {
    id: 'exp5',
    title: 'Warung Babi Guling',
    category: 'Food',
    media: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop'
    ],
    rating: 4.7,
    review: 'Authentic Balinese roast pork that locals queue for! The crispy skin and tender meat with traditional spices was an explosion of flavors. A true cultural food experience.',
    location: 'Denpasar, Bali',
    cost: 8,
    affiliateLink: 'https://example.com/warung-babi',
  },

  // Paris Experiences  
  {
    id: 'exp6',
    title: 'Eiffel Tower Visit',
    category: 'Activities',
    media: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=500&fit=crop'
    ],
    rating: 4.7,
    review: 'Iconic landmark, especially beautiful at night with the lights! The view from the top floor was spectacular, and seeing the tower sparkle on the hour was magical.',
    location: 'Paris, France',
    cost: 25,
    affiliateLink: 'https://example.com/eiffel-ticket',
  },
  {
    id: 'exp7',
    title: 'The Louvre Museum',
    category: 'Activities',
    media: [
      'https://images.unsplash.com/photo-1566139317-c6dbc36073a6?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop'
    ],
    rating: 4.6,
    review: 'A vast collection of art, could spend days here. Mona Lisa is a must-see! The Egyptian artifacts and classical sculptures were equally impressive. Book skip-the-line tickets in advance.',
    location: 'Paris, France',
    cost: 17,
    affiliateLink: 'https://example.com/louvre-ticket',
  },
  {
    id: 'exp8',
    title: 'Hotel des Grands Boulevards',
    category: 'Accommodation',
    media: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop'
    ],
    rating: 4.4,
    review: 'Chic Parisian boutique hotel with incredible breakfast. The Art Deco design and central location made it perfect for exploring the city.',
    location: '9th Arrondissement, Paris',
    cost: 180,
    affiliateLink: 'https://example.com/paris-hotel',
  },
  {
    id: 'exp9',
    title: 'Le Comptoir du Relais',
    category: 'Food',
    media: [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=500&fit=crop'
    ],
    rating: 4.6,
    review: 'Traditional French bistro with amazing wine selection. The duck confit was perfectly cooked and the atmosphere was authentically Parisian.',
    location: 'Saint-Germain, Paris',
    cost: 45,
    affiliateLink: 'https://example.com/comptoir',
  },

  // Tokyo Experiences
  {
    id: 'exp10',
    title: 'Shibuya Crossing Experience',
    category: 'Activities',
    media: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=500&fit=crop'
    ],
    rating: 4.3,
    review: 'The world\'s busiest pedestrian crossing is a must-see spectacle! Being part of the organized chaos was surreal. Great photo opportunities from the sky bridge.',
    location: 'Shibuya, Tokyo',
    cost: 0,
    affiliateLink: 'https://example.com/shibuya',
  },
  {
    id: 'exp11',
    title: 'Tsukiji Outer Market Food Tour',
    category: 'Food',
    media: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=500&fit=crop'
    ],
    rating: 4.9,
    review: 'Fresh sushi for breakfast and incredible street food! Our guide showed us hidden gems and explained the cultural significance of each dish. Unforgettable culinary adventure.',
    location: 'Tsukiji, Tokyo',
    cost: 75,
    affiliateLink: 'https://example.com/tsukiji-tour',
  },

  // New York Experiences
  {
    id: 'exp12',
    title: 'Central Park Bike Tour',
    category: 'Activities',
    media: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop'
    ],
    rating: 4.5,
    review: 'Perfect way to see the park\'s highlights! The guide shared fascinating history and we covered so much ground. Great exercise with amazing city views.',
    location: 'Manhattan, New York',
    cost: 35,
    affiliateLink: 'https://example.com/central-park-bike',
  },
  {
    id: 'exp13',
    title: 'Brooklyn Food Festival',
    category: 'Events',
    media: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop'
    ],
    rating: 4.4,
    review: 'Amazing diversity of food vendors representing the borough\'s multicultural community. Live music, great atmosphere, and endless delicious options.',
    location: 'Brooklyn, New York',
    cost: 12,
    affiliateLink: 'https://example.com/brooklyn-food-fest',
  }
];

// Expanded Travel Cards with comprehensive experiences
export const mockTravelCards: TravelCard[] = [
  {
    id: 'tc1',
    title: '7 Days in Bali: Honeymoon Bliss',
    description: 'A romantic getaway exploring the best of Ubud and Seminyak. Indulge in luxurious villas, vibrant local culture, and breathtaking sunrises.',
    thumbnail: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=500&fit=crop',
    creatorId: 'user1',
    date: '2024-06-15',
    likes: 1250,
    comments: 89,
    destination: 'Bali, Indonesia',
    tripType: 'Romantic',
    budget: 'Luxury',
    isActive: true,
    experiences: [
      { ...mockExperiences.find(e => e.id === 'exp1')!, day: 1, time: '15:00' },
      { ...mockExperiences.find(e => e.id === 'exp2')!, day: 1, time: '19:00' },
      { ...mockExperiences.find(e => e.id === 'exp3')!, day: 2, time: '04:00' },
      { ...mockExperiences.find(e => e.id === 'exp4')!, day: 3, time: '21:00' },
      { ...mockExperiences.find(e => e.id === 'exp5')!, day: 4, time: '12:00' },
    ],
  },
  {
    id: 'tc2',
    title: 'Paris Art & Culture: A Week of Wonder',
    description: 'Immerse yourself in the art and history of Paris. Explore world-class museums, galleries, and charming bistros in the City of Light.',
    thumbnail: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=500&fit=crop',
    creatorId: 'user2',
    date: '2024-05-20',
    likes: 980,
    comments: 65,
    destination: 'Paris, France',
    tripType: 'Cultural',
    budget: 'Mid-range',
    isActive: false,
    experiences: [
      { ...mockExperiences.find(e => e.id === 'exp6')!, day: 1, time: '10:00' },
      { ...mockExperiences.find(e => e.id === 'exp7')!, day: 2, time: '09:30' },
      { ...mockExperiences.find(e => e.id === 'exp8')!, day: 1, time: '16:00' },
      { ...mockExperiences.find(e => e.id === 'exp9')!, day: 2, time: '19:30' },
    ],
  },
  {
    id: 'tc3',
    title: 'Tokyo Neon Dreams: Urban Adventure',
    description: 'Experience the electric energy of Tokyo from bustling crossings to serene temples. Modern meets traditional in this incredible urban journey.',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop',
    creatorId: 'user4',
    date: '2024-07-10',
    likes: 1456,
    comments: 134,
    destination: 'Tokyo, Japan',
    tripType: 'Urban',
    budget: 'Mid-range',
    isActive: true,
    experiences: [
      { ...mockExperiences.find(e => e.id === 'exp10')!, day: 1, time: '14:00' },
      { ...mockExperiences.find(e => e.id === 'exp11')!, day: 2, time: '06:00' },
    ],
  },
  {
    id: 'tc4',
    title: 'Spiti Solo Bike Ride: Himalayan Adventure',
    description: 'An epic solo journey through the rugged terrains of Spiti Valley. Experience breathtaking landscapes, remote monasteries, and the silence of the mountains.',
    thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=500&fit=crop',
    creatorId: 'user1',
    date: '2024-07-01',
    likes: 1500,
    comments: 120,
    destination: 'Spiti Valley, India',
    tripType: 'Adventure',
    budget: 'Budget',
    isActive: true,
    experiences: [
      {
        id: 'exp-spiti-1',
        title: 'Tashigang Village Homestay',
        category: 'Accommodation',
        media: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop'],
        rating: 4.7,
        review: 'Authentic mountain village experience with incredible hospitality from local families.',
        location: 'Tashigang, Spiti Valley',
        cost: 30,
        day: 1,
        time: '17:00'
      },
      {
        id: 'exp-spiti-2',
        title: 'Key Monastery Visit',
        category: 'Activities',
        media: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop'],
        rating: 4.9,
        review: 'Ancient Tibetan Buddhist monastery perched dramatically on a hilltop. Spiritual experience with stunning valley views.',
        location: 'Spiti Valley, India',
        cost: 5,
        day: 2,
        time: '09:00'
      },
    ],
  },
  {
    id: 'tc5',
    title: 'New York Food & Culture: 5 Days of Flavor',
    description: 'Dive into NYC\'s incredible food scene and cultural diversity. From street food to fine dining, Broadway shows to local festivals.',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=500&fit=crop',
    creatorId: 'user6',
    date: '2024-08-15',
    likes: 892,
    comments: 72,
    destination: 'New York City, USA',
    tripType: 'Urban',
    budget: 'Mid-range',
    isActive: false,
    experiences: [
      { ...mockExperiences.find(e => e.id === 'exp12')!, day: 1, time: '11:00' },
      { ...mockExperiences.find(e => e.id === 'exp13')!, day: 3, time: '16:00' },
    ],
  },
  {
    id: 'tc6',
    title: 'Morocco Desert Safari: Sahara Magic',
    description: 'Explore the golden dunes of the Sahara, stay in luxury desert camps, and experience Berber culture under starlit skies.',
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d5d9d7?w=400&h=500&fit=crop',
    creatorId: 'user7',
    date: '2024-09-05',
    likes: 2134,
    comments: 156,
    destination: 'Merzouga, Morocco',
    tripType: 'Adventure',
    budget: 'Mid-range',
    isActive: true,
    experiences: [
      {
        id: 'exp-morocco-1',
        title: 'Luxury Desert Camp',
        category: 'Accommodation',
        media: ['https://images.unsplash.com/photo-1539650116574-75c0c6d5d9d7?w=400&h=500&fit=crop'],
        rating: 4.8,
        review: 'Glamping at its finest! Traditional Berber tents with modern amenities. Camel ride at sunset was magical.',
        location: 'Erg Chebbi, Morocco',
        cost: 120,
        day: 1,
        time: '15:00'
      },
      {
        id: 'exp-morocco-2',
        title: 'Berber Cooking Class',
        category: 'Food',
        media: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop'],
        rating: 4.6,
        review: 'Learned to make tagine and couscous from scratch. The flavors of traditional Berber spices were incredible.',
        location: 'Merzouga, Morocco',
        cost: 35,
        day: 2,
        time: '10:00'
      },
    ],
  },
  {
    id: 'tc7',
    title: 'Iceland Ring Road: Land of Fire & Ice',
    description: 'Complete the iconic Ring Road circuit around Iceland. Witness waterfalls, geysers, glaciers, and the Northern Lights in this Nordic wonderland.',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    creatorId: 'user4',
    date: '2024-10-12',
    likes: 1789,
    comments: 201,
    destination: 'Iceland',
    tripType: 'Adventure',
    budget: 'Luxury',
    isActive: true,
    experiences: [
      {
        id: 'exp-iceland-1',
        title: 'Blue Lagoon Spa',
        category: 'Activities',
        media: ['https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=500&fit=crop'],
        rating: 4.5,
        review: 'Relaxing in the milky blue geothermal waters surrounded by lava fields. A unique and rejuvenating experience.',
        location: 'Grindavik, Iceland',
        cost: 85,
        day: 1,
        time: '14:00'
      },
    ],
  },
  {
    id: 'tc8',
    title: 'Greek Island Hopping: Aegean Paradise',
    description: 'Sail through the Greek islands discovering ancient history, crystal waters, and Mediterranean charm. Santorini sunsets to Mykonos nightlife.',
    thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=500&fit=crop',
    creatorId: 'user8',
    date: '2024-08-28',
    likes: 2456,
    comments: 189,
    destination: 'Greek Islands',
    tripType: 'Beach',
    budget: 'Mid-range',
    isActive: false,
    experiences: [
      {
        id: 'exp-greece-1',
        title: 'Santorini Sunset Cruise',
        category: 'Activities',
        media: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=500&fit=crop'],
        rating: 4.9,
        review: 'Sailing around the caldera at sunset was absolutely magical. The colors of the sky and the view of the white villages was breathtaking.',
        location: 'Santorini, Greece',
        cost: 65,
        day: 2,
        time: '17:00'
      },
    ],
  }
];

// Expanded Stories
export const mockStories: Story[] = [
  { id: 'story1', userId: 'user1', profilePic: mockUsers[0].profilePic, username: mockUsers[0].username, hasNew: true },
  { id: 'story2', userId: 'user2', profilePic: mockUsers[1].profilePic, username: mockUsers[1].username, hasNew: false },
  { id: 'story3', userId: 'user3', profilePic: mockUsers[2].profilePic, username: mockUsers[2].username, hasNew: true },
  { id: 'story4', userId: 'user4', profilePic: mockUsers[3].profilePic, username: mockUsers[3].username, hasNew: false },
  { id: 'story5', userId: 'user5', profilePic: mockUsers[4].profilePic, username: mockUsers[4].username, hasNew: true },
  { id: 'story6', userId: 'user6', profilePic: mockUsers[5].profilePic, username: mockUsers[5].username, hasNew: true },
  { id: 'story7', userId: 'user7', profilePic: mockUsers[6].profilePic, username: mockUsers[6].username, hasNew: false },
  { id: 'story8', userId: 'user8', profilePic: mockUsers[7].profilePic, username: mockUsers[7].username, hasNew: true },
];

// Expanded Moments
export const mockMoments: Moment[] = [
  {
    id: 'moment1',
    creatorId: 'user3',
    media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=711&fit=crop',
    caption: 'Breathtaking sunset over the caldera in Santorini! Pure magic. ✨ #Santorini #SunsetLover',
    likes: 345,
    comments: 22,
    timestamp: '2024-07-17T18:30:00Z',
    type: 'image',
    travelCardId: 'tc1',
  },
  {
    id: 'moment2',
    creatorId: 'user2',
    media: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=711&fit=crop',
    caption: 'Found the most incredible street food in Bangkok! 🍜🌶️ #BangkokFood #StreetEats',
    likes: 512,
    comments: 48,
    timestamp: '2024-07-16T12:00:00Z',
    type: 'image',
    travelCardId: 'tc2',
  },
  {
    id: 'moment3',
    creatorId: 'user4',
    media: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=711&fit=crop',
    caption: 'Lost in the neon jungle of Tokyo! Every corner tells a story 🏮 #TokyoNights #UrbanExploration',
    likes: 789,
    comments: 65,
    timestamp: '2024-07-15T21:45:00Z',
    type: 'image',
    travelCardId: 'tc3',
  },
  {
    id: 'moment4',
    creatorId: 'user6',
    media: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=711&fit=crop',
    caption: 'Central Park views from above! NYC never gets old 🍂 #NYCAutumn #SoloTravel',
    likes: 423,
    comments: 31,
    timestamp: '2024-07-14T14:20:00Z',
    type: 'image',
    travelCardId: 'tc5',
  },
  {
    id: 'moment5',
    creatorId: 'user7',
    media: 'https://images.unsplash.com/photo-1539650116574-75c0c6d5d9d7?w=400&h=711&fit=crop',
    caption: 'Sahara sunrise from our desert camp. No words can describe this feeling 🐪 #SaharaDesert #Morocco',
    likes: 1234,
    comments: 87,
    timestamp: '2024-07-13T06:30:00Z',
    type: 'image',
    travelCardId: 'tc6',
  },
  {
    id: 'moment6',
    creatorId: 'user8',
    media: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=711&fit=crop',
    caption: 'Greek island hopping hits different when you find spots like this! 🏝️ #GreekIslands #IslandLife',
    likes: 656,
    comments: 42,
    timestamp: '2024-07-12T17:15:00Z',
    type: 'image',
    travelCardId: 'tc8',
  },
  {
    id: 'moment7',
    creatorId: 'user1',
    media: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=711&fit=crop',
    caption: 'Himalayan mornings in Spiti Valley. The silence here is profound 🏔️ #SpitiBikeTrip #Himalayas',
    likes: 892,
    comments: 54,
    timestamp: '2024-07-11T07:00:00Z',
    type: 'image',
    travelCardId: 'tc4',
  },
  {
    id: 'moment8',
    creatorId: 'user5',
    media: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=711&fit=crop',
    caption: 'Blue Lagoon vibes in Iceland. Nature\'s spa at its finest 🧘‍♀️ #Iceland #WellnessTravel',
    likes: 734,
    comments: 38,
    timestamp: '2024-07-10T15:45:00Z',
    type: 'image',
    travelCardId: 'tc7',
  },
  {
    id: 'moment9',
    creatorId: 'user3',
    media: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=711&fit=crop',
    caption: 'Paris never fails to amaze. Every street corner is a postcard 🥐 #ParisLife #StreetPhotography',
    likes: 567,
    comments: 29,
    timestamp: '2024-07-09T19:30:00Z',
    type: 'image',
    travelCardId: 'tc2',
  },
  {
    id: 'moment10',
    creatorId: 'user2',
    media: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=711&fit=crop',
    caption: 'Learning to cook tagine in the Moroccan desert. Travel is the best education! 🍲 #MoroccanCuisine #CulturalExchange',
    likes: 445,
    comments: 36,
    timestamp: '2024-07-08T11:20:00Z',
    type: 'image',
    travelCardId: 'tc6',
  }
];

export const mockChats: Chat[] = [
  { id: 'chat1', userId: 'user2', username: mockUsers[1].username, profilePic: mockUsers[1].profilePic, lastMessage: 'Hey, planning a trip to Paris soon!', time: '2h ago' },
  { id: 'chat2', userId: 'user4', username: mockUsers[3].username, profilePic: mockUsers[3].profilePic, lastMessage: 'Thanks for the Ladakh tips!', time: '1d ago' },
  { id: 'chat3', userId: 'user5', username: mockUsers[4].username, profilePic: mockUsers[4].profilePic, lastMessage: 'Let me know about the Kerala trip.', time: '3d ago' },
  { id: 'chat4', userId: 'user6', username: mockUsers[5].username, profilePic: mockUsers[5].profilePic, lastMessage: 'Solo travel safety tips?', time: '1w ago' },
  { id: 'chat5', userId: 'user7', username: mockUsers[6].username, profilePic: mockUsers[6].profilePic, lastMessage: 'Amazing cultural photos!', time: '2w ago' },
];

export const mockExperienceMoments = [
  {
    experienceId: 'exp1', // Ubud Jungle Villa
    moments: [
      {
        id: 'exp1_m1', 
        creatorId: 'user1', 
        media: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=375&fit=crop',
        caption: 'Morning dip with this incredible view! The infinity pool here is absolutely magical 🏊‍♀️✨', 
        likes: 150, 
        comments: 10, 
        type: 'image' as const
      },
      {
        id: 'exp1_m2', 
        creatorId: 'user3', 
        media: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=375&fit=crop',
        caption: 'Floating breakfast goals! Nothing beats starting the day like this in paradise 🍓🥐', 
        likes: 200, 
        comments: 15, 
        type: 'image' as const
      },
      {
        id: 'exp1_m3', 
        creatorId: 'user2', 
        media: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=375&fit=crop',
        caption: 'The sunset from our villa balcony was pure magic! 🌅', 
        likes: 180, 
        comments: 12, 
        type: 'image' as const
      },
      {
        id: 'exp1_m4', 
        creatorId: 'user4', 
        media: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=300&h=375&fit=crop',
        caption: 'Traditional Balinese architecture meets modern luxury 🏛️', 
        likes: 95, 
        comments: 8, 
        type: 'video' as const
      },
    ]
  },
  {
    experienceId: 'exp2', // Sisterfields Café
    moments: [
      {
        id: 'exp2_m1', 
        creatorId: 'user2', 
        media: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=375&fit=crop',
        caption: 'Brunch perfection! Their açai bowl is absolutely divine 🍳🥣', 
        likes: 120, 
        comments: 8, 
        type: 'image' as const
      },
      {
        id: 'exp2_m2', 
        creatorId: 'user4', 
        media: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=375&fit=crop',
        caption: 'Coffee break in Seminyak ☕ The perfect spot for people watching', 
        likes: 80, 
        comments: 5, 
        type: 'image' as const
      },
      {
        id: 'exp2_m3', 
        creatorId: 'user5', 
        media: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=300&h=375&fit=crop',
        caption: 'Fresh smoothie bowls that taste as good as they look! 🌺', 
        likes: 140, 
        comments: 11, 
        type: 'image' as const
      },
    ]
  },
  {
    experienceId: 'exp3', // Mount Batur Sunrise Trek
    moments: [
      {
        id: 'exp3_m1', 
        creatorId: 'user1', 
        media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=375&fit=crop',
        caption: 'Reached the summit! Worth every step in the dark. The sunrise was absolutely unforgettable ⛰️🌅', 
        likes: 250, 
        comments: 20, 
        type: 'image' as const
      },
      {
        id: 'exp3_m2', 
        creatorId: 'user5', 
        media: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=300&h=375&fit=crop',
        caption: 'Sunrise magic from above the clouds! This is why we wake up at 3 AM ✨', 
        likes: 300, 
        comments: 25, 
        type: 'video' as const
      },
      {
        id: 'exp3_m3', 
        creatorId: 'user3', 
        media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=375&fit=crop',
        caption: 'The trek was challenging but the views made it all worthwhile 🥾', 
        likes: 175, 
        comments: 14, 
        type: 'image' as const
      },
    ]
  }
];

export const getCreator = (creatorId: string) => mockUsers.find(user => user.id === creatorId);