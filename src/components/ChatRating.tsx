import { Star } from 'lucide-react';
import { useState } from 'react';

interface ChatRatingProps {
  onSubmit: (rating: number) => void;
  onClose: () => void;
}

const ChatRating: React.FC<ChatRatingProps> = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#141414] p-6 rounded-lg shadow-xl border border-gray-800 w-96">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Rate your chat experience</h3>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="transform transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hover || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              if (rating > 0) onSubmit(rating);
            }}
            className={`px-6 py-2 rounded-lg ${
              rating > 0 
                ? 'bg-[#E50914] hover:bg-[#B2070F]' 
                : 'bg-gray-700 cursor-not-allowed'
            } text-white transition-colors`}
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRating; 