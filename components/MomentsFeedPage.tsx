import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Moment } from '../types';
import { getCreator } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MomentsFeedPageProps {
  moments: Moment[];
  onSelectTravelCard: (travelCardId: string) => void;
}

export function MomentsFeedPage({ moments, onSelectTravelCard }: MomentsFeedPageProps) {
  return (
    <div className="relative h-screen w-full snap-y snap-mandatory bg-gray-900">
      {moments.map((moment, index) => {
        const creator = getCreator(moment.creatorId);
        if (!creator) return null;

        return (
          <div
            key={moment.id}
            className="relative h-full w-full snap-start flex items-center justify-center cursor-pointer"
            onClick={() => onSelectTravelCard(moment.travelCardId)}
          >
            {/* Polaroid Frame */}
            <div className="bg-white p-4 pb-6 rounded-lg shadow-2xl relative w-[calc(100%-2rem)] max-w-sm mx-auto flex flex-col">
              {/* Image */}
              <div className="relative w-full aspect-[9/16] rounded-md overflow-hidden">
                <ImageWithFallback src={moment.media} alt={`Moment for ${moment.caption}`} className="w-full h-full object-cover" />
              </div>

              {/* Caption and Action Buttons */}
              <div className="mt-4 text-gray-800 text-center">
                <div className="flex items-center justify-center mb-2">
                  <ImageWithFallback src={creator.profilePic} alt={creator.name} className="w-8 h-8 rounded-full mr-2 border-2 border-teal-400" />
                  <p className="text-sm">@{creator.username}</p>
                </div>
                <p className="text-sm line-clamp-3 mb-4">{moment.caption}</p>
                <div className="flex justify-between items-center text-gray-600 text-sm border-t border-gray-200 pt-3 mt-auto">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1 text-red-500" /> {moment.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={16} className="mr-1 text-blue-500" /> {moment.comments}
                    </div>
                  </div>
                  <Share2 size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}