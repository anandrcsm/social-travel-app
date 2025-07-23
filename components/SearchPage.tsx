import { useState } from 'react';
import { MapPin, Filter } from 'lucide-react';
import { TravelCard as TravelCardType } from '../types';
import { getCreator } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchPageProps {
  travelCards: TravelCardType[];
  onSelectTravelCard: (id: string) => void;
}

const trendingTags = ['Adventure', 'Luxury', 'Foodie', 'Solo Travel', 'Honeymoon', 'Backpacking', 'Culture'];

export function SearchPage({ travelCards, onSelectTravelCard }: SearchPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    budget: '',
    tripType: '',
  });

  const featuredCards = travelCards.slice(0, 3);

  const filteredCards = travelCards.filter(card => {
    const creator = getCreator(card.creatorId);
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          creator?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBudget = filters.budget === '' || card.budget === filters.budget;
    const matchesTripType = filters.tripType === '' || card.tripType === filters.tripType;

    return matchesSearch && matchesBudget && matchesTripType;
  });

  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl text-gray-900 mb-6">Search</h2>
      <input
        type="text"
        placeholder="Search destinations, creators, trip types..."
        className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <h3 className="text-lg text-gray-800 mb-3">Filters</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Budget</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
            >
              <option value="">All</option>
              <option value="Budget">Budget</option>
              <option value="Mid-range">Mid-range</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Trip Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={filters.tripType}
              onChange={(e) => setFilters({ ...filters, tripType: e.target.value })}
            >
              <option value="">All</option>
              <option value="Romantic">Romantic</option>
              <option value="Adventure">Adventure</option>
              <option value="Cultural">Cultural</option>
              <option value="Food">Food</option>
              <option value="Wellness">Wellness</option>
              <option value="City Break">City Break</option>
              <option value="Party">Party</option>
              <option value="Thematic">Thematic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg text-gray-800 mb-3">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map(tag => (
            <span key={tag} className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-emerald-200 transition duration-200">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <h3 className="text-lg text-gray-800 mb-3">Search Results ({filteredCards.length})</h3>
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCards.map(card => (
            <div
              key={card.id}
              className="bg-amber-50 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] active:scale-95 border border-gray-200"
              onClick={() => onSelectTravelCard(card.id)}
            >
              <div className="relative w-full aspect-[4/5] border-b border-orange-200">
                <ImageWithFallback src={card.thumbnail} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h4 className="text-gray-900 text-sm line-clamp-2">{card.title}</h4>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <MapPin size={10} className="mr-1" /> {card.destination}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-8">No Travel Cards found matching your criteria.</p>
      )}
    </div>
  );
}