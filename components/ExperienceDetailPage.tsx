import { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Star, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock,
  Bookmark,
  ExternalLink,
  Camera,
  Play,
  Users
} from 'lucide-react';
import { Experience } from '../types';
import { StarRating } from './StarRating';
import { CategoryTag } from './CategoryTag';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCreator, mockExperienceMoments } from '../data/mockData';

interface ExperienceDetailPageProps {
  experienceId: string | null;
  allExperiences: Experience[];
  onBack: () => void;
  onAddToItinerary: (experienceId: string) => void;
}

export function ExperienceDetailPage({ 
  experienceId, 
  allExperiences, 
  onBack, 
  onAddToItinerary 
}: ExperienceDetailPageProps) {
  const [selectedMomentIndex, setSelectedMomentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const experience = allExperiences.find(exp => exp.id === experienceId);
  
  if (!experience) {
    return (
      <div className="p-4 text-center text-red-500 bg-yellow-50 min-h-screen">
        Experience not found.
      </div>
    );
  }

  // Get related moments for this experience
  const relatedMoments = mockExperienceMoments.find(em => em.experienceId === experienceId)?.moments || [];
  
  // Combine experience media with user moments
  const allMoments = [
    ...experience.media.map((media, index) => ({
      id: `exp-media-${index}`,
      media,
      type: 'image' as const,
      caption: `${experience.title} - View ${index + 1}`,
      likes: Math.floor(Math.random() * 100) + 50,
      comments: Math.floor(Math.random() * 20) + 5,
      creatorId: 'official'
    })),
    ...relatedMoments
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const selectedMoment = allMoments[selectedMomentIndex];

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <CategoryTag category={experience.category} />
          </div>
          <button
            onClick={() => onAddToItinerary(experience.id)}
            className="bg-teal-500 text-white p-2 rounded-full shadow-md hover:bg-teal-600 transition duration-200"
            aria-label="Add to Itinerary"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>

      <div className="pb-20">
        {/* Experience Title */}
        <div className="bg-white p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{experience.title}</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="mr-1" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Moments Gallery Grid */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Moments ({allMoments.length})
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <Camera size={16} className="mr-1" />
              <span>Tap to view</span>
            </div>
          </div>

          {/* Main Selected Moment */}
          {selectedMoment && (
            <div className="mb-4">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback 
                  src={selectedMoment.media} 
                  alt={selectedMoment.caption}
                  className="w-full h-full object-cover"
                />
                {selectedMoment.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                      <Play size={32} className="text-white" fill="white" />
                    </div>
                  </div>
                )}
                
                {/* Creator info overlay for user moments */}
                {selectedMoment.creatorId !== 'official' && (
                  <div className="absolute bottom-3 left-3 flex items-center bg-black bg-opacity-70 rounded-full px-3 py-1">
                    <ImageWithFallback 
                      src={getCreator(selectedMoment.creatorId)?.profilePic || ''} 
                      alt="Creator"
                      className="w-6 h-6 rounded-full mr-2 border border-white"
                    />
                    <span className="text-white text-sm font-medium">
                      @{getCreator(selectedMoment.creatorId)?.username}
                    </span>
                  </div>
                )}
              </div>

              {/* Moment engagement */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleLike}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={isLiked ? 'text-red-500 fill-current' : ''} 
                    />
                    <span className="text-sm">{selectedMoment.likes + likesCount}</span>
                  </button>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle size={20} />
                    <span className="text-sm">{selectedMoment.comments}</span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Moment caption */}
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                {selectedMoment.caption}
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-4 gap-2">
            {allMoments.map((moment, index) => (
              <button
                key={moment.id}
                onClick={() => setSelectedMomentIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                  index === selectedMomentIndex 
                    ? 'ring-2 ring-teal-500 ring-offset-2' 
                    : 'hover:scale-105'
                }`}
              >
                <ImageWithFallback 
                  src={moment.media} 
                  alt={`Moment ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {moment.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black bg-opacity-60 rounded-full p-1">
                      <Play size={16} className="text-white" fill="white" />
                    </div>
                  </div>
                )}
                {moment.creatorId !== 'official' && (
                  <div className="absolute top-1 right-1">
                    <Users size={12} className="text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Details */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="space-y-4">
            {/* Rating and Cost */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <StarRating rating={experience.rating} />
                <div className="flex items-center text-gray-600">
                  <Star size={16} className="mr-1 text-yellow-500" />
                  <span className="text-sm font-medium">{experience.rating}/5.0</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-gray-900">
                  <DollarSign size={18} className="mr-1" />
                  <span className="text-xl font-bold">
                    {experience.cost > 0 ? experience.cost : 'Free'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">per person</span>
              </div>
            </div>

            {/* Review */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Review</h4>
              <p className="text-gray-700 leading-relaxed">{experience.review}</p>
            </div>

            {/* Trip Details */}
            {(experience.day || experience.time) && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Trip Details</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {experience.day && (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Day {experience.day}</span>
                    </div>
                  )}
                  {experience.time && (
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{experience.time}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-4">
          <div className="flex space-x-3">
            <button
              onClick={() => onAddToItinerary(experience.id)}
              className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-600 transition duration-200 shadow-sm flex items-center justify-center"
            >
              <Bookmark size={18} className="mr-2" />
              Add to Itinerary
            </button>
            {experience.affiliateLink && (
              <a
                href={experience.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition duration-200 shadow-sm flex items-center justify-center"
              >
                <ExternalLink size={18} className="mr-2" />
                Book Now
              </a>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white p-4 mt-2">
          <div className="text-center text-gray-500 text-sm">
            <p>Want to share your own moment from this experience?</p>
            <button className="text-teal-600 font-semibold mt-1 hover:underline">
              Add Your Photo/Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}