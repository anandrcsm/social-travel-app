import { MessageSquareText } from 'lucide-react';
import { mockChats } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MessengerPageProps {
  onBack: () => void;
}

export function MessengerPage({ onBack }: MessengerPageProps) {
  return (
    <div className="p-4 pb-20 bg-yellow-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center text-teal-600 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
        </button>
        <h2 className="text-2xl text-gray-900">Messenger</h2>
        <button onClick={() => alert('Start new chat!')} className="text-teal-600 hover:text-teal-700">
          <MessageSquareText size={24} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <h3 className="text-xl text-gray-900 p-4 border-b border-gray-200">Inbox</h3>
        {mockChats.length > 0 ? (
          mockChats.map(chat => (
            <div key={chat.id} className="flex items-center p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition duration-200">
              <ImageWithFallback src={chat.profilePic} alt={chat.username} className="w-12 h-12 rounded-full mr-4 border-2 border-teal-400" />
              <div className="flex-grow">
                <p className="text-gray-800">{chat.username}</p>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 py-8">No recent chats.</p>
        )}
      </div>

      <button
        onClick={() => alert('New chat initiated!')}
        className="fixed bottom-24 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 z-40"
        aria-label="New Chat"
      >
        <MessageSquareText size={28} />
      </button>
    </div>
  );
}