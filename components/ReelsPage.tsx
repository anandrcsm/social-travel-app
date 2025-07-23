import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { TravelCard as TravelCardType } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReelsPageProps {
  travelCards: TravelCardType[];
}

interface ReelCardProps {
  card: TravelCardType;
  isActive: boolean;
}

function ReelCard({ card, isActive }: ReelCardProps) {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {/* Video Placeholder - In a real app, this would be a video element */}
      <div className="relative w-full h-full">
        <ImageWithFallback
          src={card.thumbnail}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center gap-4">
        <div className="text-center">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              liked ? 'text-red-500' : 'text-white'
            }`}
          >
            <Heart size={28} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <span className="text-white text-xs mt-1">{card.likes + (liked ? 1 : 0)}</span>
        </div>

        <div className="text-center">
          <button className="w-12 h-12 text-white rounded-full flex items-center justify-center">
            <MessageCircle size={28} />
          </button>
          <span className="text-white text-xs mt-1">{card.comments}</span>
        </div>

        <div className="text-center">
          <button className="w-12 h-12 text-white rounded-full flex items-center justify-center">
            <Share2 size={28} />
          </button>
          <span className="text-white text-xs mt-1">{card.shares}</span>
        </div>

        <button className="w-12 h-12 text-white rounded-full flex items-center justify-center">
          <MoreHorizontal size={28} />
        </button>

        {/* User Avatar */}
        <div className="relative">
          <ImageWithFallback
            src={card.user.avatar}
            alt={card.user.name}
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          {card.user.isInfluencer && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">+</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-20 text-white">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">@{card.user.username}</span>
          {card.user.verified && <Badge variant="secondary" className="px-1.5 py-0 text-xs">✓</Badge>}
          {card.isActive && (
            <div className="flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full text-xs">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Live
            </div>
          )}
        </div>
        
        <h3 className="font-semibold mb-1">{card.title}</h3>
        <p className="text-sm opacity-90 mb-2">{card.destination} • {card.duration}</p>
        
        <div className="flex items-center gap-2 text-xs">
          <span>#{card.tags.join(' #')}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span>{card.totalCost}</span>
          <span>{card.rating.toFixed(1)} ⭐</span>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}

export function ReelsPage({ travelCards }: ReelsPageProps) {
  const [currentReel, setCurrentReel] = useState(0);

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentReel < travelCards.length - 1) {
      setCurrentReel(currentReel + 1);
    } else if (e.deltaY < 0 && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black overflow-hidden"
      onWheel={handleScroll}
    >
      <div 
        className="h-full transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateY(-${currentReel * 100}vh)` 
        }}
      >
        {travelCards.map((card, index) => (
          <div key={card.id} className="h-screen w-full">
            <ReelCard 
              card={card} 
              isActive={index === currentReel}
            />
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {travelCards.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${
              index === currentReel ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-3 py-2 rounded-full">
        Scroll to explore
      </div>
    </div>
  );
}