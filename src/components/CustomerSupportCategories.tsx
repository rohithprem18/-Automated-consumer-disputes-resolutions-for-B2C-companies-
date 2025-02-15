import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Tv, Settings, HelpCircle } from 'lucide-react';

const CustomerSupportCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Billing & Payments",
      description: "Get help with payment issues, refunds, and billing questions",
      icon: <CreditCard className="w-12 h-12 text-[#E50914]" />,
      path: "billing"
    },
    {
      title: "Streaming Issues",
      description: "Resolve playback problems, quality issues, and device connectivity",
      icon: <Tv className="w-12 h-12 text-[#E50914]" />,
      path: "streaming"
    },
    {
      title: "Account Management",
      description: "Manage your account settings, profiles, and security",
      icon: <Settings className="w-12 h-12 text-[#E50914]" />,
      path: "account"
    },
    {
      title: "General Support",
      description: "Get help with other Netflix-related questions",
      icon: <HelpCircle className="w-12 h-12 text-[#E50914]" />,
      path: "general"
    }
  ];

  const handleCategoryClick = (path: string) => {
    navigate(`/customer-support/${path}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-[#141414] p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Customer Support</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white hover:text-[#E50914]"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.path)}
              className="bg-[#141414] p-8 rounded-lg shadow-lg border border-gray-800 
                       cursor-pointer hover:border-[#E50914] transition-all transform 
                       hover:scale-105 flex flex-col items-center text-center"
            >
              <div className="mb-6">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{category.title}</h2>
              <p className="text-gray-400">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportCategories; 