import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlayCircle, Headphones, User } from 'lucide-react';
import { auth } from '../firebase/config';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'User';

  const handleNetflixClick = () => {
    window.open('https://www.netflix.com', '_blank');
  };

  const handleCustomerCareClick = () => {
    navigate('/customer-support');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="top-right" />
      <nav className="bg-[#141414] p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Netflix Portal</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5 text-[#E50914]" />
              <span>Welcome, {userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white hover:text-[#E50914]"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            onClick={handleNetflixClick}
            className="bg-[#141414] p-12 rounded-xl shadow-2xl border border-gray-800 
                     cursor-pointer hover:border-[#E50914] transition-all duration-300
                     transform hover:scale-105 hover:-rotate-1 hover:shadow-red-900/20
                     flex flex-col items-center text-center group"
          >
            <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110">
              <PlayCircle className="w-32 h-32 text-[#E50914] animate-pulse" 
                         strokeWidth={1.2}
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Go to Netflix</h2>
            <p className="text-gray-400 text-lg">Watch your favorite movies and TV shows</p>
          </div>
          
          <div
            onClick={handleCustomerCareClick}
            className="bg-[#141414] p-12 rounded-xl shadow-2xl border border-gray-800 
                     cursor-pointer hover:border-[#E50914] transition-all duration-300
                     transform hover:scale-105 hover:rotate-1 hover:shadow-red-900/20
                     flex flex-col items-center text-center group"
          >
            <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110">
              <Headphones className="w-32 h-32 text-[#E50914]" 
                         strokeWidth={1.2}
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Customer Support</h2>
            <p className="text-gray-400 text-lg">Get help with your Netflix account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 