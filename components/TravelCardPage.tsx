import { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  Plane,
  Hotel,
  Utensils,
  Camera,
  ShoppingBag,
  Filter,
  Star
} from 'lucide-react';
import { TravelCard } from '../types';
import { CategoryTag } from './CategoryTag';
import { StarRating } from './StarRating';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCreator } from '../data/mockData';
import { travelProducts, productCategories } from '../data/travelProducts';

interface TravelCardPageProps {
  travelCardId: string | null;
  allTravelCards: TravelCard[];
  onBack: () => void;
  onSelectExperience: (id: string) => void;
  onAddToItinerary: (experienceId: string) => void;
  onSelectProduct: (productId: string) => void;
}

export function TravelCardPage({ 
  travelCardId, 
  allTravelCards, 
  onBack, 
  onSelectExperience,
  onAddToItinerary,
  onSelectProduct
}: TravelCardPageProps) {
  const [activeTab, setActiveTab] = useState('Itinerary');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const card = allTravelCards.find(tc => tc.id === travelCardId);

  if (!card) {
    return <div className="p-4 text-center text-red-500">Travel Card not found.</div>;
  }

  const creator = getCreator(card.creatorId);
  const sortedExperiences = [...card.experiences].sort((a, b) => (a.day || 999) - (b.day || 999));
  const experienceCategories = ['Itinerary', 'Accommodation', 'Food', 'Events', 'Activities', 'Travel Items'];
  const filteredExperiences = card.experiences.filter(exp => exp.category === activeTab);

  // Filter products by category
  const filteredProducts = selectedProductCategory === 'all' 
    ? travelProducts 
    : travelProducts.filter(p => p.category === selectedProductCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Accommodation': return <Hotel size={16} className="text-blue-600" />;
      case 'Food': return <Utensils size={16} className="text-green-600" />;
      case 'Activities': return <Camera size={16} className="text-purple-600" />;
      case 'Events': return <Calendar size={16} className="text-red-600" />;
      default: return <MapPin size={16} className="text-gray-600" />;
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleComment = () => {
    alert('Opening comments...');
  };

  const handleAddToTrip = () => {
    alert('Added to your trip planning list!');
  };

  const handleBookNow = () => {
    alert('Redirecting to booking platform...');
  };

  return (
    <div className="p-4 pb-20 bg-surface-warm min-h-screen">
      <button 
        onClick={onBack} 
        className="flex items-center text-brand-primary mb-4 hover:underline font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6 border border-white/20">
        <div className="relative w-full aspect-[4/5]">
          <ImageWithFallback src={card.thumbnail} alt={card.title} className="w-full h-full object-cover" />
          
          {/* Active Trip Badge */}
          {card.isActive && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center bg-gradient-brand px-3 py-1.5 rounded-full shadow-brand backdrop-blur-sm">
                <div className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </div>
                <span className="text-white text-xs font-semibold">Live Trip</span>
              </div>
            </div>
          )}

          {/* Trip Type Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <span className="text-white text-sm font-medium">{card.tripType}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl text-gray-900 mb-3">{card.title}</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">{card.description}</p>
          
          {/* Creator info */}
          {creator && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ImageWithFallback 
                  src={creator.profilePic} 
                  alt={creator.name} 
                  className="w-12 h-12 rounded-full mr-3 border-2 border-brand-primary/20" 
                />
                <div>
                  <p className="font-semibold text-gray-800">{creator.name}</p>
                  <p className="text-sm text-gray-600">@{creator.username}</p>
                </div>
              </div>
              <button
                onClick={handleAddToTrip}
                className="bg-brand-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-brand-primary-dark transition-colors"
              >
                Add to Trip
              </button>
            </div>
          )}
          
          <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" /> 
              <span>{card.destination}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" /> 
              <span>{new Date(card.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              >
                <Heart 
                  size={20} 
                  className={isLiked ? 'text-red-500 fill-current' : 'hover:scale-110 transition-transform'} 
                />
                <span className="font-medium">{card.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button 
                onClick={handleComment}
                className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
              >
                <MessageCircle size={20} className="hover:scale-110 transition-transform" />
                <span className="font-medium">{card.comments}</span>
              </button>
              <button 
                onClick={handleBookmark}
                className="flex items-center hover:text-brand-accent transition-colors"
              >
                <ShoppingBag 
                  size={20} 
                  className={isBookmarked ? 'text-brand-accent fill-current' : 'hover:scale-110 transition-transform'} 
                />
              </button>
            </div>
            <button 
              onClick={handleShare}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Share2 size={20} className="hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="mb-6">
        <h3 className="text-xl text-gray-900 mb-4">Explore This Trip</h3>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {experienceCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-3 rounded-2xl text-sm font-medium transition duration-200 whitespace-nowrap flex items-center space-x-2 ${
                activeTab === cat 
                  ? 'bg-gradient-brand text-white shadow-brand' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat === 'Travel Items' && <ShoppingBag size={16} />}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Based on Active Tab */}
      {activeTab === 'Itinerary' ? (
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-white/20">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center">
            <Plane size={20} className="mr-2 text-brand-primary" />
            Your Journey Timeline
          </h4>
          
          {sortedExperiences.length > 0 ? (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-brand-primary to-brand-accent"></div>
              
              {sortedExperiences.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="relative flex items-start mb-8 cursor-pointer group hover:bg-gray-50 rounded-xl p-3 transition-colors"
                  onClick={() => onSelectExperience(exp.id)}
                >
                  {/* Day marker */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center text-white font-bold shadow-brand">
                      {exp.day || index + 1}
                    </div>
                    {/* Connector */}
                    {index < sortedExperiences.length - 1 && (
                      <div className="w-px h-8 bg-gray-300 mx-auto mt-2"></div>
                    )}
                  </div>
                  
                  {/* Experience Card */}
                  <div className="ml-4 flex-grow">
                    <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 group-hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center mb-2">
                            {getCategoryIcon(exp.category)}
                            <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {exp.category}
                            </span>
                          </div>
                          <h5 className="font-bold text-gray-900 text-lg">{exp.title}</h5>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {exp.cost > 0 ? `$${exp.cost}` : 'Free'}
                          </div>
                          {exp.time && (
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Clock size={12} className="mr-1" />
                              {exp.time}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <MapPin size={14} className="mr-1 text-gray-400" />
                        <span className="text-sm text-gray-600">{exp.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <StarRating rating={exp.rating} size="sm" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectExperience(exp.id);
                          }}
                          className="text-brand-primary text-sm font-semibold hover:underline"
                        >
                          View Details →
                        </button>
                      </div>
                      
                      <p className="text-gray-700 text-sm mt-3 line-clamp-2 leading-relaxed">
                        {exp.review}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">No itinerary details available.</p>
          )}
        </div>
      ) : activeTab === 'Travel Items' ? (
        <div className="space-y-4">
          {/* Product Category Filters */}
          <div className="bg-white rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-900 flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Travel Essentials
              </h4>
              <Filter size={16} className="text-gray-500" />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedProductCategory(category.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedProductCategory === category.id
                      ? 'bg-brand-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-white/20 cursor-pointer transform transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-95"
                onClick={() => onSelectProduct(product.id)}
              >
                <div className="flex">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <ImageWithFallback 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900 text-sm line-clamp-1">{product.name}</h5>
                        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-gray-600">{product.rating} ({product.reviewCount})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">${product.price}</div>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">${product.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(product.affiliateLink, '_blank');
                        }}
                        className="bg-brand-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-brand-primary-dark transition-colors"
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Other category tabs
        <div className="space-y-4">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map(exp => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] active:scale-95 border border-white/20"
                onClick={() => onSelectExperience(exp.id)}
              >
                <div className="relative w-full h-40">
                  <ImageWithFallback src={exp.media[0]} alt={exp.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2">
                    <CategoryTag category={exp.category} />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-gray-900 text-lg font-semibold mb-2">{exp.title}</h4>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <StarRating rating={exp.rating} />
                    <span className="text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1" /> {exp.location}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-4 leading-relaxed">{exp.review}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {exp.cost > 0 ? `$${exp.cost}` : 'Free'}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToItinerary(exp.id);
                        }}
                        className="bg-brand-secondary text-white px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-brand-secondary-dark transition duration-200"
                      >
                        Add to Itinerary
                      </button>
                      {exp.affiliateLink && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow();
                          }}
                          className="bg-brand-primary text-white px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-brand-primary-dark transition duration-200"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">No experiences found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}