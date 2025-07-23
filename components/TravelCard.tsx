import { Heart, MessageCircle, Share2, MapPin, Calendar, Bookmark, Eye } from 'lucide-react';
import { TravelCard as TravelCardType } from '../types';
import { getCreator } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TravelCardProps {
  card: TravelCardType;
  onClick: (id: string) => void;
  onFollowTrip?: (id: string) => void;
}

export function TravelCard({ card, onClick, onFollowTrip }: TravelCardProps) {
  const creator = getCreator(card.creatorId);

  if (!creator) return null;

  return (
    <article 
      className="bg-white rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.01] hover:shadow-brand active:scale-95 border border-white/20 backdrop-blur-sm"
      onClick={() => onClick(card.id)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <ImageWithFallback 
          src={card.thumbnail} 
          alt={card.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
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
          <div className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20">
            <span className="text-white text-xs font-medium">{card.tripType}</span>
          </div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 opacity-90" />
              <span className="text-sm font-medium">{card.destination}</span>
            </div>
            <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Eye size={12} className="mr-1" />
              <span className="text-xs font-medium">{(card.likes / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {card.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <ImageWithFallback 
                src={creator.profilePic} 
                alt={creator.name} 
                className="w-8 h-8 rounded-full mr-3 ring-2 ring-brand-primary/20" 
              />
              {creator.isCreator && (
                <div className="absolute -bottom-0.5 -right-1 w-4 h-4 bg-gradient-brand rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{creator.name}</p>
              <p className="text-xs text-gray-500">@{creator.username}</p>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar size={12} className="mr-1" />
            <span>{new Date(card.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-brand-primary transition-colors group">
              <Heart size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{(card.likes / 1000).toFixed(1)}k</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-brand-secondary transition-colors group">
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{card.comments}</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-gray-600 hover:text-brand-accent transition-colors p-1">
              <Bookmark size={16} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors p-1">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Follow Trip Button */}
        {card.isActive && onFollowTrip && (
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              onFollowTrip(card.id); 
            }}
            className="mt-4 w-full bg-gradient-brand text-white py-3 px-4 rounded-2xl font-semibold hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95"
          >
            Follow This Journey
          </button>
        )}
      </div>
    </article>
  );
}