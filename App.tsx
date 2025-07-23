import { useState, useEffect } from 'react';
import { Home, Search, PlusCircle, User, Camera, Brain } from 'lucide-react';

// Import all components
import { LoginPage } from './components/LoginPage';
import { HomeFeed } from './components/HomeFeed';
import { MomentsFeedPage } from './components/MomentsFeedPage';
import { SearchPage } from './components/SearchPage';
import { ProfilePage } from './components/ProfilePage';
import { TravelCardPage } from './components/TravelCardPage';
import { ExperienceDetailPage } from './components/ExperienceDetailPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BucketListPage } from './components/BucketListPage';
import { CreatePage } from './components/CreatePage';
import { MessengerPage } from './components/MessengerPage';
import { AccountDetailsPage } from './components/AccountDetailsPage';
import { CulturalTriviaPage } from './components/CulturalTriviaPage';

// Import data
import { 
  mockTravelCards, 
  mockUsers, 
  mockStories, 
  mockMoments, 
  mockExperiences 
} from './data/mockData';
import { travelProducts } from './data/travelProducts';
import { Experience } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedTravelCardId, setSelectedTravelCardId] = useState<string | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [userItinerary, setUserItinerary] = useState<any[]>([]);
  const [bucketListExperiences, setBucketListExperiences] = useState<Experience[]>([]);

  // State for all travel cards and experiences
  const [allTravelCards, setAllTravelCards] = useState(mockTravelCards);
  const [allExperiences] = useState(mockExperiences);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  const handleSelectTravelCard = (id: string) => {
    setSelectedTravelCardId(id);
    setCurrentPage('travelCardDetail');
  };

  const handleSelectExperience = (id: string) => {
    setSelectedExperienceId(id);
    setCurrentPage('experienceDetail');
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('productDetail');
  };

  const handleAddToItinerary = (experienceId: string) => {
    const exp = allExperiences.find(e => e.id === experienceId);
    if (exp && !userItinerary.some(item => item.id === exp.id)) {
      setUserItinerary(prev => [...prev, exp]);
      // Also add to bucket list
      setBucketListExperiences(prev => {
        if (!prev.some(item => item.id === exp.id)) {
          return [...prev, exp];
        }
        return prev;
      });
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl z-50 shadow-lg';
      toast.textContent = `"${exp.title}" added to your itinerary and bucket list!`;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    } else if (exp) {
      // Show info toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-xl z-50 shadow-lg';
      toast.textContent = `"${exp.title}" is already in your itinerary.`;
      document.body.appendChild(toast);
      setTimeout(() => document.body.removeChild(toast), 3000);
    }
  };

  const handleRemoveFromBucketList = (experienceId: string) => {
    setBucketListExperiences(prev => prev.filter(exp => exp.id !== experienceId));
  };

  const handleAddToNewTravelCard = (experiences: Experience[]) => {
    // This would normally open the create page with pre-populated experiences
    setCurrentPage('create');
    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = `Starting new travel card with ${experiences.length} experiences!`;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  const handlePublishNewTravelCard = (newCard: any) => {
    setAllTravelCards(prevCards => [newCard, ...prevCards]);
    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded-xl z-50 shadow-lg';
    toast.textContent = 'Travel Card published successfully!';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'home':
        return (
          <HomeFeed 
            travelCards={allTravelCards} 
            stories={mockStories}
            moments={mockMoments}
            onSelectTravelCard={handleSelectTravelCard}
            onNavigateToMessenger={() => setCurrentPage('messenger')}
            onNavigateToAccountDetails={() => setCurrentPage('accountDetails')}
            onNavigateToTrivia={() => setCurrentPage('trivia')}
          />
        );
      case 'moments':
        return <MomentsFeedPage moments={mockMoments} onSelectTravelCard={handleSelectTravelCard} />;
      case 'search':
        return <SearchPage travelCards={allTravelCards} onSelectTravelCard={handleSelectTravelCard} />;
      case 'profile':
        const currentUser = mockUsers[0];
        const userTravelCards = allTravelCards.filter(card => card.creatorId === currentUser.id);
        return (
          <ProfilePage 
            user={currentUser} 
            travelCards={userTravelCards} 
            onSelectTravelCard={handleSelectTravelCard}
            onNavigateToBucketList={() => setCurrentPage('bucketList')}
            bucketListCount={bucketListExperiences.length}
            isOwnProfile={true}
          />
        );
      case 'bucketList':
        return (
          <BucketListPage
            bucketListExperiences={bucketListExperiences}
            onBack={() => setCurrentPage('profile')}
            onRemoveFromBucketList={handleRemoveFromBucketList}
            onAddToNewTravelCard={handleAddToNewTravelCard}
          />
        );
      case 'travelCardDetail':
        return (
          <TravelCardPage 
            travelCardId={selectedTravelCardId} 
            allTravelCards={allTravelCards} 
            onBack={() => setCurrentPage('home')} 
            onSelectExperience={handleSelectExperience}
            onAddToItinerary={handleAddToItinerary}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'experienceDetail':
        return (
          <ExperienceDetailPage 
            experienceId={selectedExperienceId} 
            allExperiences={allExperiences} 
            onBack={() => setCurrentPage('travelCardDetail')} 
            onAddToItinerary={handleAddToItinerary}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailPage 
            productId={selectedProductId} 
            allProducts={travelProducts} 
            onBack={() => setCurrentPage('travelCardDetail')} 
          />
        );
      case 'create':
        return <CreatePage onBack={() => setCurrentPage('home')} onPublish={handlePublishNewTravelCard} />;
      case 'accountDetails':
        return <AccountDetailsPage onNavigate={setCurrentPage} />;
      case 'messenger':
        return <MessengerPage onBack={() => setCurrentPage('home')} />;
      case 'trivia':
        return <CulturalTriviaPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <HomeFeed 
            travelCards={allTravelCards} 
            stories={mockStories}
            moments={mockMoments}
            onSelectTravelCard={handleSelectTravelCard}
            onNavigateToMessenger={() => setCurrentPage('messenger')}
            onNavigateToAccountDetails={() => setCurrentPage('accountDetails')}
            onNavigateToTrivia={() => setCurrentPage('trivia')}
          />
        );
    }
  };

  if (currentPage === 'login') {
    return renderPage();
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, pages: ['home', 'messenger', 'travelCardDetail', 'experienceDetail', 'productDetail'] },
    { id: 'moments', label: 'Moments', icon: Camera, pages: ['moments'] },
    { id: 'create', label: 'Create', icon: PlusCircle, pages: ['create'], isCenter: true },
    { id: 'search', label: 'Explore', icon: Search, pages: ['search'] },
    { id: 'profile', label: 'Profile', icon: User, pages: ['profile', 'accountDetails', 'bucketList'] },
  ];

  // Show trivia button in navigation when on certain pages
  const showTriviaButton = ['home', 'search', 'profile'].includes(currentPage) && currentPage !== 'trivia';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {renderPage()}
      </div>

      {/* Cultural Trivia Floating Button */}
      {showTriviaButton && (
        <div className="fixed bottom-24 right-4 z-40">
          <button
            onClick={() => setCurrentPage('trivia')}
            className="bg-gradient-brand-secondary p-3 rounded-full shadow-brand-secondary hover:shadow-xl hover:scale-110 transition-all duration-200 active:scale-95 group"
            aria-label="Cultural Quest"
          >
            <Brain size={24} className="text-white group-hover:rotate-12 transition-transform duration-200" />
          </button>
          <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Cultural Quest
          </div>
        </div>
      )}

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="glass-effect border-t border-white/20 backdrop-blur-xl">
          <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
            {navItems.map((item) => {
              const isActive = item.pages.includes(currentPage);
              const IconComponent = item.icon;

              if (item.isCenter) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className="relative flex flex-col items-center justify-center -mt-6"
                    aria-label={item.label}
                  >
                    <div className="bg-gradient-brand p-4 rounded-2xl shadow-brand hover:shadow-brand-secondary hover:scale-105 transition-all duration-200 active:scale-95">
                      <IconComponent size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-medium text-brand-primary mt-2">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isActive 
                      ? 'text-brand-primary' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  aria-label={item.label}
                >
                  <div className={`p-1 rounded-lg transition-all duration-200 relative ${
                    isActive ? 'bg-brand-primary/10' : ''
                  }`}>
                    <IconComponent 
                      size={24} 
                      strokeWidth={isActive ? 2.5 : 1.5} 
                      className={`transition-all duration-200 ${
                        isActive ? 'text-brand-primary' : ''
                      }`}
                    />
                    {/* Show bucket list count on profile icon */}
                    {item.id === 'profile' && bucketListExperiences.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">
                          {bucketListExperiences.length > 9 ? '9+' : bucketListExperiences.length}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
                    isActive ? 'text-brand-primary' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}