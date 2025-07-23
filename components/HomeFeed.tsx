import { useState } from 'react';
import { MessageSquareText, Bell, Heart, Brain, Globe, Star } from 'lucide-react';
import { TravelCard as TravelCardType, Story, Moment } from '../types';
import { TravelCard } from './TravelCard';
import { MomentCard } from './MomentCard';
import { Stories } from './Stories';
import { SuggestedCreatorsCarousel } from './SuggestedCreatorsCarousel';
import { SuggestedTravelCardsCarousel } from './SuggestedTravelCardsCarousel';
import { BrandLogo } from './BrandLogo';
import { mockUsers } from '../data/mockData';
import { culturalFacts } from '../data/culturalTrivia';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeFeedProps {
  travelCards: TravelCardType[];
  stories: Story[];
  moments: Moment[];
  onSelectTravelCard: (id: string) => void;
  onNavigateToMessenger: () => void;
  onNavigateToAccountDetails: () => void;
  onNavigateToTrivia: () => void;
}

export function HomeFeed({ 
  travelCards, 
  stories, 
  moments,
  onSelectTravelCard, 
  onNavigateToMessenger, 
  onNavigateToAccountDetails,
  onNavigateToTrivia
}: HomeFeedProps) {
  const [followedTrips, setFollowedTrips] = useState<Record<string, boolean>>({});
  const currentUser = mockUsers.find(user => user.id === 'user1');

  const handleFollowTrip = (cardId: string) => {
    setFollowedTrips(prev => ({ ...prev, [cardId]: !prev[cardId] }));
    console.log(`Toggling follow for trip ${cardId}`);
  };

  const handleStoryClick = (storyId: string) => {
    alert(`Viewing story: ${storyId}`);
  };

  // Get a random cultural fact
  const randomFact = culturalFacts[Math.floor(Math.random() * culturalFacts.length)];

  const feedItems = [];
  const allFeedContent = [];

  // Interleave travel cards and moments
  let tcIndex = 0;
  let momentIndex = 0;
  while (tcIndex < travelCards.length || momentIndex < moments.length) {
    if (tcIndex < travelCards.length) {
      allFeedContent.push({ type: 'travelCard', data: travelCards[tcIndex++] });
    }
    if (momentIndex < moments.length && (tcIndex % 2 === 0 || tcIndex === travelCards.length)) {
      allFeedContent.push({ type: 'moment', data: moments[momentIndex++] });
    }
  }

  // Inject carousels and cultural content
  for (let i = 0; i < allFeedContent.length; i++) {
    feedItems.push(allFeedContent[i]);

    if (i === 1) {
      // Add Cultural Quest promotion
      feedItems.push({ type: 'cultural-quest' });
    } else if (i === 3) {
      const suggestedCreators = mockUsers.filter(u => !u.isCreator).slice(0, 5);
      if (suggestedCreators.length > 0) {
        feedItems.push({ type: 'carousel-creators', data: suggestedCreators });
      }
    } else if (i === 5) {
      // Add cultural fact card
      feedItems.push({ type: 'cultural-fact', data: randomFact });
    } else if (i === 7) {
      const suggestedCards = travelCards.filter(card => card.likes < 1000).sort(() => 0.5 - Math.random()).slice(0, 5);
      if (suggestedCards.length > 0) {
        feedItems.push({ type: 'carousel-trips', data: suggestedCards });
      }
    }
  }

  if (!currentUser) return null;

  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 glass-effect border-b border-white/20 backdrop-blur-xl">
        <div className="flex items-center justify-between p-4">
          {/* Profile Button */}
          <button 
            onClick={onNavigateToAccountDetails} 
            className="relative group"
          >
            <div className="relative">
              <ImageWithFallback 
                src={currentUser.profilePic} 
                alt="My Profile" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-primary/20 group-hover:ring-brand-primary/40 transition-all duration-200" 
              />
              {/* Status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></div>
            </div>
          </button>

          {/* Brand Logo */}
          <BrandLogo size="md" className="flex-1 justify-center" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-black/5 rounded-xl transition-colors relative"
              onClick={() => alert('Notifications')}
            >
              <Bell size={20} className="text-gray-600" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-brand-primary rounded-full"></div>
            </button>
            <button 
              onClick={onNavigateToMessenger} 
              className="p-2 hover:bg-black/5 rounded-xl transition-colors"
            >
              <MessageSquareText size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Welcome Message with Cultural Theme */}
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-600">
            Ready to explore new cultures today, <span className="font-semibold text-gray-900">{currentUser.name}</span>? 🌍
          </p>
        </div>
      </div>

      {/* Stories Section */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <Stories stories={stories} onStoryClick={handleStoryClick} />
      </div>

      {/* Feed Content */}
      <div className="px-4 pt-4 pb-20">
        {feedItems.map((item, index) => {
          if (item.type === 'travelCard') {
            return (
              <div key={item.data.id} className="mb-6">
                <TravelCard
                  card={item.data}
                  onClick={onSelectTravelCard}
                  onFollowTrip={handleFollowTrip}
                />
              </div>
            );
          } else if (item.type === 'moment') {
            return (
              <div key={item.data.id} className="mb-6">
                <MomentCard moment={item.data} onMomentClick={onSelectTravelCard} />
              </div>
            );
          } else if (item.type === 'cultural-quest') {
            return (
              <div key={`cultural-quest-${index}`} className="mb-6">
                <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-6 text-white relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <Globe size={128} className="text-white" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-3">
                      <div className="bg-white/20 p-2 rounded-full mr-3">
                        <Brain size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Cultural Quest</h3>
                    </div>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      Test your knowledge about fascinating cultures from around the world! Learn about traditions, customs, and unique practices.
                    </p>
                    <button
                      onClick={onNavigateToTrivia}
                      className="bg-white text-brand-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center"
                    >
                      <Star size={18} className="mr-2" />
                      Start Quest
                    </button>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === 'cultural-fact') {
            return (
              <div key={`cultural-fact-${index}`} className="mb-6">
                <div className="bg-gradient-to-br from-surface-warm to-surface-cool rounded-2xl p-5 border border-white/20 relative">
                  <div className="flex items-start">
                    <div className="bg-gradient-brand-secondary p-2 rounded-full mr-4 flex-shrink-0">
                      <Globe size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h4 className="font-bold text-gray-900 mr-2">Did You Know?</h4>
                        <span className="bg-brand-secondary/10 text-brand-secondary text-xs px-2 py-1 rounded-full font-medium">
                          {item.data.culture}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed italic">
                        "{item.data.fact}"
                      </p>
                      <div className="mt-3 text-sm text-gray-500">
                        📍 {item.data.region}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (item.type === 'carousel-creators') {
            return (
              <div key={`carousel-creators-${index}`} className="mb-6">
                <SuggestedCreatorsCarousel creators={item.data} onSelectCreator={onNavigateToAccountDetails} />
              </div>
            );
          } else if (item.type === 'carousel-trips') {
            return (
              <div key={`carousel-trips-${index}`} className="mb-6">
                <SuggestedTravelCardsCarousel cards={item.data} onSelectTravelCard={onSelectTravelCard} />
              </div>
            );
          }
          return null;
        })}

        {/* End of feed indicator */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20">
            <Heart size={16} className="text-brand-primary" />
            <span className="text-sm text-gray-600">You're all caught up!</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Why not explore some new cultures? Try our Cultural Quest! 🌍
          </p>
        </div>
      </div>
    </div>
  );
}