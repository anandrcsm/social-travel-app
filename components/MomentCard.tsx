import { Heart, MessageCircle, Share2, Camera } from 'lucide-react';
import { Moment } from '../types';
import { getCreator } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MomentCardProps {
  moment: Moment;
  onMomentClick: (travelCardId: string) => void;
}

export function MomentCard({ moment, onMomentClick }: MomentCardProps) {
  const creator = getCreator(moment.creatorId);

  if (!creator) return null;

  return (
    <div
      className="bg-white rounded-lg shadow-lg mb-6 border border-gray-100 cursor-pointer p-3 pb-4 relative"
      onClick={() => onMomentClick(moment.travelCardId)}
    >
      <div className="p-1 flex items-center">
        <ImageWithFallback src={creator.profilePic} alt={creator.name} className="w-9 h-9 rounded-full mr-3 border-2 border-teal-400" />
        <div>
          <p className="text-gray-800 text-sm">{creator.name}</p>
          <p className="text-xs text-gray-500">@{creator.username}</p>
        </div>
      </div>
      <div className="relative w-full aspect-[4/5] bg-gray-200 flex items-center justify-center overflow-hidden rounded-md">
        {moment.type === 'image' || moment.type === 'video' || moment.type === 'reel' ? (
          <ImageWithFallback src={moment.media.replace('400/711', '400/500')} alt="Moment" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            <Camera size={48} className="text-gray-400" />
            <span className="ml-2 text-lg">Media Preview</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-gray-800 text-sm line-clamp-2 text-center mb-2">{moment.caption}</p>
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
  );
}