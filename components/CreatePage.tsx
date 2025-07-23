import { useState } from 'react';
import { PlusCircle, MapPin, Calendar, DollarSign, Tag } from 'lucide-react';
import { Experience } from '../types';
import { CategoryTag } from './CategoryTag';

interface CreatePageProps {
  onBack: () => void;
  onPublish: (newCard: any) => void;
}

const tripTypes = ['Romantic', 'Adventure', 'Cultural', 'Food', 'Wellness', 'City Break', 'Party', 'Thematic'];
const experienceCategories: Array<'Accommodation' | 'Food' | 'Events' | 'Activities'> = ['Accommodation', 'Food', 'Events', 'Activities'];

export function CreatePage({ onBack, onPublish }: CreatePageProps) {
  const [tripName, setTripName] = useState('');
  const [description, setDescription] = useState('');
  const [tripType, setTripType] = useState('');
  const [destination, setDestination] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    title: '', 
    category: 'Accommodation', 
    media: [], 
    rating: 0, 
    review: '', 
    cost: 0, 
    affiliateLink: '', 
    day: 0, 
    time: '',
    location: ''
  });
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.category) {
      const experience: Experience = {
        id: `new-exp-${Date.now()}`,
        title: newExperience.title!,
        category: newExperience.category!,
        media: newExperience.media || [],
        rating: newExperience.rating || 0,
        review: newExperience.review || '',
        location: newExperience.location || '',
        cost: newExperience.cost || 0,
        affiliateLink: newExperience.affiliateLink,
        day: newExperience.day,
        time: newExperience.time
      };
      
      setExperiences([...experiences, experience]);
      setNewExperience({ 
        title: '', 
        category: 'Accommodation', 
        media: [], 
        rating: 0, 
        review: '', 
        cost: 0, 
        affiliateLink: '', 
        day: 0, 
        time: '',
        location: ''
      });
      setShowExperienceForm(false);
    } else {
      alert('Please fill in experience title and category.');
    }
  };

  const handlePublish = () => {
    if (tripName && description && destination && experiences.length > 0) {
      const newCard = {
        id: `new-tc-${Date.now()}`,
        title: tripName,
        description: description,
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        creatorId: 'user1',
        date: new Date().toISOString().slice(0, 10),
        likes: 0,
        comments: 0,
        destination: destination,
        tripType: tripType,
        budget: 'Mid-range',
        isActive: false,
        experiences: experiences,
      };
      onPublish(newCard);
    } else {
      alert('Please fill in all trip details and add at least one experience.');
    }
  };

  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <button onClick={onBack} className="flex items-center text-teal-600 mb-4 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl text-gray-900 mb-6">Create New Travel Card</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl text-gray-900 mb-4">Trip Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Trip Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              placeholder="e.g., 5 Days in Goa"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg min-h-[80px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of your trip..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Goa, India"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Trip Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
            >
              <option value="">Select Trip Type</option>
              {tripTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl text-gray-900 mb-4">Experiences</h3>
        {experiences.length === 0 && (
          <p className="text-gray-600 text-center mb-4">No experiences added yet.</p>
        )}
        <div className="space-y-3 mb-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div>
                <p className="text-gray-800">{exp.title}</p>
                <CategoryTag category={exp.category} />
                {exp.day && <p className="text-xs text-gray-500">Day: {exp.day}</p>}
                {exp.time && <p className="text-xs text-gray-500">Time: {exp.time}</p>}
              </div>
              <button
                onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {!showExperienceForm ? (
          <button
            onClick={() => setShowExperienceForm(true)}
            className="w-full bg-teal-500 text-white py-2.5 rounded-lg hover:bg-teal-600 transition duration-200 shadow-md flex items-center justify-center"
          >
            <PlusCircle size={20} className="mr-2" /> Add New Experience
          </button>
        ) : (
          <div className="bg-gray-100 p-4 rounded-lg space-y-3">
            <h4 className="text-gray-900 text-lg">New Experience Details</h4>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newExperience.title || ''}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                placeholder="e.g., Ubud Monkey Forest"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newExperience.category || 'Accommodation'}
                onChange={(e) => setNewExperience({ ...newExperience, category: e.target.value as any })}
              >
                {experienceCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newExperience.location || ''}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="e.g., Ubud, Bali"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Day</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newExperience.day || ''}
                  onChange={(e) => setNewExperience({ ...newExperience, day: parseInt(e.target.value) || 0 })}
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={newExperience.time || ''}
                  onChange={(e) => setNewExperience({ ...newExperience, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newExperience.rating || ''}
                onChange={(e) => setNewExperience({ ...newExperience, rating: parseFloat(e.target.value) || 0 })}
                placeholder="4.5"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Review</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg min-h-[60px]"
                value={newExperience.review || ''}
                onChange={(e) => setNewExperience({ ...newExperience, review: e.target.value })}
                placeholder="Your short review..."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Cost ($)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={newExperience.cost || ''}
                onChange={(e) => setNewExperience({ ...newExperience, cost: parseFloat(e.target.value) || 0 })}
                placeholder="25"
              />
            </div>
            <button
              onClick={handleAddExperience}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
            >
              Save Experience
            </button>
            <button
              onClick={() => setShowExperienceForm(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => alert('Trip saved as draft!')}
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition duration-200 shadow-md"
        >
          Save as Draft
        </button>
        <button
          onClick={handlePublish}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md"
        >
          Publish Travel Card
        </button>
      </div>
    </div>
  );
}