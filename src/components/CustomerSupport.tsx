import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Star, MessageSquareOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { categoryData } from '../data/supportData';
import { Message } from '../types/chat';
import DevAnalytics from './DevAnalytics';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import { generateAIResponse, analyzeTone } from '../services/aiService';
import ChatRating from './ChatRating';

const CustomerSupport = () => {
  const { category = 'general' } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showRating, setShowRating] = useState(false);

  // Add error handling for invalid category
  if (!categoryData[category as keyof typeof categoryData]) {
    toast.error('Invalid support category');
    navigate('/customer-support');
    return null;
  }

  const currentCategory = categoryData[category as keyof typeof categoryData];

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '0',
      text: `Welcome to ${currentCategory.title}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [category]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      tone: analyzeTone(text)
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setIsTyping(true);

    try {
      // Find matching quick reply for context
      const quickReply = currentCategory.quickReplies.find(qr => 
        text.toLowerCase().includes(qr.text.toLowerCase())
      );
      
      // Get context from predefined responses
      const context = quickReply 
        ? `Category: ${currentCategory.title}\nTopic: ${quickReply.text}\nPredefined Response: ${currentCategory.responses[quickReply.action]}`
        : `Category: ${currentCategory.title}`;

      // Generate AI response
      const aiResponse = await generateAIResponse(text, context);

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      // Fallback to predefined response if AI fails
      const fallbackResponse = quickReply 
        ? currentCategory.responses[quickReply.action]
        : "I understand you have a question about " + text + ". Could you please select one of the common questions below or rephrase your question?";

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEndChat = () => {
    setShowRating(true);
  };

  const handleRating = (rating: number) => {
    // Add final message showing rating
    const ratingMessage: Message = {
      id: Date.now().toString(),
      text: `Chat ended. Customer rating: ${rating}/5 ⭐`,
      sender: 'system',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, ratingMessage]);
    setShowRating(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Restore Navigation Bar */}
      <nav className="bg-[#141414] p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/customer-support')}
            className="flex items-center space-x-2 text-white hover:text-[#E50914]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </button>
          <h1 className="text-xl font-bold text-white ml-4">{currentCategory.title}</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Chat Interface - Left Side */}
          <div className="col-span-7">
            <div className="bg-[#141414] rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Rest of the chat interface */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-[#E50914] text-white' 
                        : message.sender === 'system'
                        ? 'bg-gray-700 text-gray-300 text-center w-full'
                        : 'bg-gray-800 text-gray-100'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-gray-400">Netflix Support is typing...</div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {currentCategory.quickReplies.map((qr, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(qr.text)}
                      className="text-sm text-left text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded"
                    >
                      {qr.text}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-700 px-4 py-2 bg-gray-800 text-white placeholder-gray-400"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    className="bg-[#E50914] text-white rounded-lg px-4 py-2 hover:bg-[#B2070F]"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleEndChat}
                    className="bg-[#E50914] text-white px-6 py-2 rounded-lg hover:bg-[#B2070F] transition-colors flex items-center space-x-2 group"
                  >
                    <span>End Chat</span>
                    <div className="w-5 h-5 relative">
                      <MessageSquareOff 
                        className="w-5 h-5 transform group-hover:rotate-12 transition-transform" 
                        strokeWidth={2}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Panel - Right Side - Now always visible */}
          <div className="col-span-5 h-[600px]">
            <DevAnalytics 
              messages={messages}
            />
          </div>
        </div>

        {showRating && (
          <ChatRating 
            onSubmit={handleRating}
            onClose={() => setShowRating(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerSupport; 