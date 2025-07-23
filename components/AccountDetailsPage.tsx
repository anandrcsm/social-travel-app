import { User, DollarSign, TrendingUp, BookOpen, Settings } from 'lucide-react';

interface AccountDetailsPageProps {
  onNavigate: (page: string) => void;
}

export function AccountDetailsPage({ onNavigate }: AccountDetailsPageProps) {
  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl text-gray-900 mb-6">Account Details</h2>
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
        <button
          onClick={() => alert('User account details (mock)')}
          className="w-full flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-200"
        >
          <User size={20} className="text-gray-600 mr-3" />
          <span className="text-gray-800">My Account Details</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => alert('Wallet & Payments (mock)')}
          className="w-full flex items-center p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition duration-200"
        >
          <DollarSign size={20} className="text-teal-600 mr-3" />
          <span className="text-gray-800">Wallet & Payments</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => alert('Affiliate earnings dashboard (mock)')}
          className="w-full flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition duration-200"
        >
          <TrendingUp size={20} className="text-purple-600 mr-3" />
          <span className="text-gray-800">Affiliate Earnings</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => alert('Bookmarks & saved trips (mock)')}
          className="w-full flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition duration-200"
        >
          <BookOpen size={20} className="text-green-600 mr-3" />
          <span className="text-gray-800">Bookmarks & Saved Trips</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition duration-200"
        >
          <Settings size={20} className="text-orange-600 mr-3" />
          <span className="text-gray-800">Settings</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-auto text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => alert('Logging out...')}
          className="w-full flex items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span className="text-red-800">Log Out</span>
        </button>
      </div>
    </div>
  );
}