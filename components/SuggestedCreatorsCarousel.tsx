import { User } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SuggestedCreatorsCarouselProps {
  creators: User[];
  onSelectCreator: (id: string) => void;
}

export function SuggestedCreatorsCarousel({ creators, onSelectCreator }: SuggestedCreatorsCarouselProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
      <h3 className="text-lg text-gray-800 mb-3">Suggested Creators</h3>
      <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
        {creators.map(creator => (
          <div
            key={creator.id}
            className="flex-shrink-0 w-48 bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] active:scale-95"
            onClick={() => onSelectCreator(creator.id)}
          >
            <div className="relative w-full aspect-[4/5]">
              <ImageWithFallback src={creator.profilePic} alt={creator.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <h4 className="text-gray-900 text-sm line-clamp-2">{creator.name}</h4>
              <p className="text-xs text-gray-600 mt-1">@{creator.username}</p>
              <button className="mt-3 w-full bg-pink-100 text-pink-800 text-xs px-3 py-1.5 rounded-full hover:bg-pink-200 transition duration-200">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}