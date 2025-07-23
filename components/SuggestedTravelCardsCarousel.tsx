import { MapPin } from 'lucide-react';
import { TravelCard } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SuggestedTravelCardsCarouselProps {
  cards: TravelCard[];
  onSelectTravelCard: (id: string) => void;
}

export function SuggestedTravelCardsCarousel({ cards, onSelectTravelCard }: SuggestedTravelCardsCarouselProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h3 className="text-lg text-gray-800 mb-3">Suggested Trips</h3>
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {cards.map(card => (
          <div
            key={card.id}
            className="flex-shrink-0 w-48 bg-amber-50 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] active:scale-95 border border-gray-200"
            onClick={() => onSelectTravelCard(card.id)}
          >
            <div className="relative w-full aspect-[4/5] border-b border-orange-200">
              <ImageWithFallback src={card.thumbnail} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex flex-col items-center text-center">
              <h4 className="text-gray-900 text-sm line-clamp-2">{card.title}</h4>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                <MapPin size={10} className="mr-1" /> {card.destination}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}