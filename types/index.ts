export interface User {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  bio: string;
  countries: number;
  cities: number;
  trips: number;
  isCreator: boolean;
  badges: string[];
}

export interface Experience {
  id: string;
  title: string;
  category: 'Accommodation' | 'Food' | 'Events' | 'Activities';
  media: string[];
  rating: number;
  review: string;
  location: string;
  cost: number;
  affiliateLink?: string;
  day?: number;
  time?: string;
}

export interface TravelCard {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creatorId: string;
  date: string;
  likes: number;
  comments: number;
  destination: string;
  tripType: string;
  budget: string;
  isActive: boolean;
  experiences: Experience[];
}

export interface Story {
  id: string;
  userId: string;
  profilePic: string;
  username: string;
  hasNew: boolean;
}

export interface Moment {
  id: string;
  creatorId: string;
  media: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'image' | 'video' | 'reel';
  travelCardId: string;
}

export interface Chat {
  id: string;
  userId: string;
  username: string;
  profilePic: string;
  lastMessage: string;
  time: string;
}

export interface ExperienceMoment {
  id: string;
  creatorId: string;
  media: string;
  caption: string;
  likes: number;
  comments: number;
  type: 'image' | 'video';
}