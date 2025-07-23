import { Story } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StoriesProps {
  stories: Story[];
  onStoryClick: (storyId: string) => void;
}

export function Stories({ stories, onStoryClick }: StoriesProps) {
  return (
    <div className="flex overflow-x-auto gap-3 p-4 bg-white border-b border-gray-100 shadow-sm scrollbar-hide">
      {stories.map(story => (
        <div
          key={story.id}
          className="flex-shrink-0 flex flex-col items-center cursor-pointer"
          onClick={() => onStoryClick(story.id)}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${story.hasNew ? 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5' : 'p-0.5'}`}>
            <ImageWithFallback
              src={story.profilePic}
              alt={story.username}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <p className="text-xs text-gray-700 mt-1 truncate w-16 text-center">{story.username}</p>
        </div>
      ))}
    </div>
  );
}