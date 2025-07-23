import { useState } from 'react';
import { MapPin, Calendar, Settings, Share2, MessageSquareText, Grid3X3, Trophy, Heart, Edit } from 'lucide-react';
import { User, TravelCard as TravelCardType } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  user: User;
  travelCards: TravelCardType[];
  onSelectTravelCard: (id: string) => void;
  onNavigateToBucketList: () => void;
  bucketListCount: number;
  isOwnProfile?: boolean;
}

export function ProfilePage({ 
  user, 
  travelCards, 
  onSelectTravelCard, 
  onNavigateToBucketList,
  bucketListCount = 0,
  isOwnProfile = true
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('All');
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample additional travel cards for the profile
  const additionalCards = [
    {
      id: 'profile-tc1',
      title: 'Weekend in San Francisco: Tech & Food',
      description: 'Exploring the tech capital with incredible food discoveries and stunning bay views.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2024-04-10',
      likes: 756,
      comments: 42,
      destination: 'San Francisco, USA',
      tripType: 'Urban',
      budget: 'Mid-range',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc2',
      title: 'Swiss Alps Winter Adventure',
      description: 'Skiing, fondue, and breathtaking mountain views in the heart of Europe.',
      thumbnail: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2024-02-15',
      likes: 1234,
      comments: 89,
      destination: 'Swiss Alps, Switzerland',
      tripType: 'Adventure',
      budget: 'Luxury',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc3',
      title: 'Kyoto Temple Hopping: Spiritual Journey',
      description: 'Ancient temples, traditional gardens, and peaceful meditation in Japan\'s cultural heart.',
      thumbnail: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2024-03-20',
      likes: 892,
      comments: 56,
      destination: 'Kyoto, Japan',
      tripType: 'Cultural',
      budget: 'Mid-range',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc4',
      title: 'Costa Rica Wildlife Safari',
      description: 'Encountering incredible biodiversity in one of the world\'s most eco-diverse countries.',
      thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2024-01-08',
      likes: 654,
      comments: 33,
      destination: 'Costa Rica',
      tripType: 'Adventure',
      budget: 'Mid-range',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc5',
      title: 'Australian Outback Road Trip',
      description: 'Epic cross-country journey through the red heart of Australia.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2023-11-12',
      likes: 1089,
      comments: 67,
      destination: 'Australian Outback, Australia',
      tripType: 'Adventure',
      budget: 'Mid-range',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc6',
      title: 'Norwegian Fjords: Nature\'s Masterpiece',
      description: 'Cruising through dramatic landscapes and witnessing the Northern Lights.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2023-10-05',
      likes: 1567,
      comments: 94,
      destination: 'Norway',
      tripType: 'Scenic',
      budget: 'Luxury',
      isActive: false,
      experiences: []
    },
    {
      id: 'profile-tc7',
      title: 'Peru\'s Ancient Wonders: Machu Picchu Trek',
      description: 'Following the Inca Trail to one of the world\'s most spectacular archaeological sites.',
      thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d5d9d7?w=400&h=500&fit=crop',
      creatorId: user.id,
      date: '2023-09-18',
      likes: 2134,
      comments: 156,
      destination: 'Machu Picchu, Peru',
      tripType: 'Adventure',
      budget: 'Mid-range',
      isActive: false,
      experiences: []
    }
  ];

  const allUserCards = [...travelCards, ...additionalCards];

  // Extract countries from destinations and organize cards
  const extractCountry = (destination: string) => {
    const parts = destination.split(',');
    return parts[parts.length - 1].trim();
  };

  const countryGroups = allUserCards.reduce((groups, card) => {
    const country = extractCountry(card.destination);
    if (!groups[country]) {
      groups[country] = [];
    }
    groups[country].push(card);
    return groups;
  }, {} as Record<string, TravelCardType[]>);

  const countries = ['All', ...Object.keys(countryGroups).sort()];
  const filteredCards = activeTab === 'All' ? allUserCards : countryGroups[activeTab] || [];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = isFollowing ? `Unfollowed ${user.name}` : `Following ${user.name}!`;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleEditProfile = () => {
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = 'Opening profile editor...';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleMessage = () => {
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-secondary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = `Opening chat with ${user.name}...`;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.name}'s Travel Profile`,
        text: user.bio,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-xl z-50 shadow-lg';
      toast.textContent = 'Profile link copied to clipboard!';
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-surface-warm pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-white to-surface-warm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl text-gray-900">Profile</h1>
            <div className="flex items-center space-x-3">
              {/* Bucket List Icon */}
              <button 
                onClick={onNavigateToBucketList}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart size={20} className="text-brand-primary" />
                {bucketListCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">
                      {bucketListCount > 9 ? '9+' : bucketListCount}
                    </span>
                  </div>
                )}
              </button>
              
              <button 
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <ImageWithFallback 
                src={user.profilePic} 
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg" 
              />
              {user.isCreator && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center border-2 border-white">
                  <Trophy size={14} className="text-white" />
                </div>
              )}
            </div>

            <h2 className="text-2xl text-gray-900 mb-1">{user.name}</h2>
            <p className="text-brand-primary mb-2">@{user.username}</p>
            <p className="text-gray-600 mb-4 leading-relaxed max-w-sm mx-auto">{user.bio}</p>

            {/* Creator Badges */}
            {user.badges && user.badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {user.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="bg-gradient-brand text-white px-3 py-1 rounded-full text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-6">
              {isOwnProfile ? (
                <button
                  onClick={handleEditProfile}
                  className="flex-1 bg-gradient-brand text-white py-3 px-6 rounded-2xl hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95 flex items-center justify-center"
                >
                  <Edit size={18} className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleFollow}
                    className={`flex-1 py-3 px-6 rounded-2xl transition-all duration-200 ${
                      isFollowing
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        : 'bg-gradient-brand text-white hover:shadow-brand hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button
                    onClick={handleMessage}
                    className="flex-1 bg-brand-secondary text-white py-3 px-6 rounded-2xl hover:bg-brand-secondary-dark hover:scale-[1.02] transition-all duration-200 active:scale-95 flex items-center justify-center"
                  >
                    <MessageSquareText size={18} className="mr-2" />
                    Message
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl text-gray-900">{allUserCards.length}</div>
              <div className="text-sm text-gray-600">Trips</div>
            </div>
            <div>
              <div className="text-2xl text-gray-900">{user.countries}</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-2xl text-gray-900">{user.cities}</div>
              <div className="text-sm text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-2xl text-gray-900">
                {allUserCards.reduce((total, card) => total + card.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center p-4">
          <Grid3X3 size={18} className="text-brand-primary mr-3" />
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide flex-1">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setActiveTab(country)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                  activeTab === country
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {country}
                <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {country === 'All' ? allUserCards.length : countryGroups[country]?.length || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredCards.length > 0 ? (
          /* Grid Layout for Travel Cards - Using SearchPage Design */
          <div className="grid grid-cols-2 gap-4">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] active:scale-95 border border-gray-200 shadow-sm"
                onClick={() => onSelectTravelCard(card.id)}
              >
                {/* Card Image - Same aspect ratio as SearchPage */}
                <div className="relative w-full aspect-[4/5] border-b border-gray-200">
                  <ImageWithFallback 
                    src={card.thumbnail} 
                    alt={card.title} 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Active Trip Badge */}
                  {card.isActive && (
                    <div className="absolute top-2 left-2">
                      <div className="flex items-center bg-gradient-brand px-2 py-1 rounded-full shadow-brand backdrop-blur-sm">
                        <div className="relative flex h-1.5 w-1.5 mr-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </div>
                        <span className="text-white text-xs">Live</span>
                      </div>
                    </div>
                  )}

                  {/* Trip Type Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
                      <span className="text-white text-xs">{card.tripType}</span>
                    </div>
                  </div>
                </div>

                {/* Card Info - Same layout as SearchPage */}
                <div className="p-4 flex flex-col items-center text-center">
                  <h4 className="text-gray-900 text-sm line-clamp-2 mb-1">{card.title}</h4>
                  <p className="text-xs text-gray-600 flex items-center">
                    <MapPin size={10} className="mr-1" /> {card.destination}
                  </p>
                  
                  {/* Additional stats row */}
                  <div className="flex items-center justify-center space-x-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1 text-red-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"/>
                      </svg>
                      {card.likes}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={10} className="mr-1" />
                      {new Date(card.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">
              {activeTab === 'All' ? 'No travel cards yet' : `No trips to ${activeTab} yet`}
            </p>
            <p className="text-sm text-gray-500">Start your first adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
}