import { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock,
  Heart,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import { Experience } from '../types';
import { StarRating } from './StarRating';
import { CategoryTag } from './CategoryTag';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BucketListPageProps {
  bucketListExperiences: Experience[];
  onBack: () => void;
  onRemoveFromBucketList: (experienceId: string) => void;
  onAddToNewTravelCard: (experiences: Experience[]) => void;
}

export function BucketListPage({ 
  bucketListExperiences, 
  onBack, 
  onRemoveFromBucketList,
  onAddToNewTravelCard
}: BucketListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const categories = ['all', 'Accommodation', 'Food', 'Activities', 'Events'];
  
  const filteredExperiences = selectedCategory === 'all' 
    ? bucketListExperiences 
    : bucketListExperiences.filter(exp => exp.category === selectedCategory);

  const handleSelectExperience = (experienceId: string) => {
    setSelectedExperiences(prev => 
      prev.includes(experienceId)
        ? prev.filter(id => id !== experienceId)
        : [...prev, experienceId]
    );
  };

  const handleCreateTravelCard = () => {
    const selectedExpsList = bucketListExperiences.filter(exp => 
      selectedExperiences.includes(exp.id)
    );
    if (selectedExpsList.length > 0) {
      onAddToNewTravelCard(selectedExpsList);
      setSelectedExperiences([]);
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
      toast.textContent = `Creating Travel Card with ${selectedExpsList.length} experiences...`;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  const handleRemove = (experienceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFromBucketList(experienceId);
    setSelectedExperiences(prev => prev.filter(id => id !== experienceId));
    // Show toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = 'Removed from bucket list';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-warm pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-primary hover:text-brand-primary-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {viewMode === 'grid' ? <List size={18} /> : <Grid3X3 size={18} />}
            </button>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bucket List</h1>
              <p className="text-gray-600 text-sm">
                {bucketListExperiences.length} experiences saved for future adventures
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter size={14} className="mr-1" />
                {category === 'all' ? 'All' : category}
                <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {category === 'all' ? bucketListExperiences.length : bucketListExperiences.filter(exp => exp.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredExperiences.length > 0 ? (
          <div>
            {/* Selection Actions */}
            {selectedExperiences.length > 0 && (
              <div className="bg-white rounded-2xl p-4 mb-4 border border-white/20 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {selectedExperiences.length} experience{selectedExperiences.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedExperiences([])}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleCreateTravelCard}
                    className="bg-brand-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-primary-dark transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Create Travel Card
                  </button>
                </div>
              </div>
            )}

            {/* Experiences Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredExperiences.map(experience => {
                  const isSelected = selectedExperiences.includes(experience.id);
                  return (
                    <div
                      key={experience.id}
                      className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-[1.01] border-2 ${
                        isSelected ? 'border-brand-primary' : 'border-white/20 hover:border-gray-200'
                      }`}
                      onClick={() => handleSelectExperience(experience.id)}
                    >
                      <div className="flex">
                        {/* Experience Image */}
                        <div className="w-24 h-24 flex-shrink-0 relative">
                          <ImageWithFallback 
                            src={experience.media[0]} 
                            alt={experience.title}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center">
                              <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Experience Info */}
                        <div className="flex-grow p-4 relative">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-grow">
                              <div className="flex items-center mb-1">
                                <CategoryTag category={experience.category} size="sm" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1">
                                {experience.title}
                              </h3>
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <MapPin size={12} className="mr-1" />
                                <span className="line-clamp-1">{experience.location}</span>
                              </div>
                              <StarRating rating={experience.rating} size="sm" />
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={(e) => handleRemove(experience.id, e)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
                            {experience.review}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 text-sm">
                              {experience.cost > 0 ? `$${experience.cost}` : 'Free'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredExperiences.map(experience => {
                  const isSelected = selectedExperiences.includes(experience.id);
                  return (
                    <div
                      key={experience.id}
                      className={`bg-white rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                        isSelected ? 'border-brand-primary' : 'border-white/20 hover:border-gray-200'
                      }`}
                      onClick={() => handleSelectExperience(experience.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{experience.title}</h3>
                            <button
                              onClick={(e) => handleRemove(experience.id, e)}
                              className="p-1 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <CategoryTag category={experience.category} size="sm" />
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {experience.location}
                            </div>
                            <StarRating rating={experience.rating} size="sm" />
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{experience.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">Your bucket list is empty</p>
            <p className="text-sm text-gray-500">Start adding experiences from travel cards to plan your future adventures!</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {bucketListExperiences.length > 0 && selectedExperiences.length === 0 && (
        <div className="fixed bottom-24 right-4 z-40">
          <button
            onClick={() => setSelectedExperiences(bucketListExperiences.map(exp => exp.id))}
            className="bg-brand-secondary p-3 rounded-full shadow-brand-secondary hover:shadow-xl hover:scale-110 transition-all duration-200 active:scale-95"
            aria-label="Select All"
          >
            <Plus size={20} className="text-white" />
          </button>
          <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Select All
          </div>
        </div>
      )}
    </div>
  );
}