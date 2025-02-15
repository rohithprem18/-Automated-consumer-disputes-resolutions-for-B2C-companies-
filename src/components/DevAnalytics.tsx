import { useState, useEffect } from 'react';
import { 
  MessageSquare, AlertTriangle, User, Activity,
  Code, GitBranch, Shield 
} from 'lucide-react';
import { 
  AreaChart, Area, CartesianGrid, 
  Tooltip, ResponsiveContainer, XAxis, YAxis, Legend 
} from 'recharts';
import { Message } from '../types/chat';

interface DevAnalyticsProps {
  messages: Message[];
}

const DevAnalytics: React.FC<DevAnalyticsProps> = ({ messages }) => {
  const [analysisData, setAnalysisData] = useState<any[]>([]);

  useEffect(() => {
    // Only process user messages for the graph
    const userMessages = messages.filter(msg => msg.sender === 'user');
    const newData = userMessages.map((msg, index) => ({
      name: `Message ${index + 1}`,
      Frustration: msg.tone ? Math.round(msg.tone.frustration * 100) : 0,
      Urgency: msg.tone ? Math.round(msg.tone.urgency * 100) : 0,
      Priority: msg.tone ? Math.round(msg.tone.priority) : 0
    }));
    setAnalysisData(newData);
  }, [messages]);

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[#E50914] p-2 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold flex items-center">
                Developer Analytics
                <span className="ml-2 px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-400">
                  v1.0
                </span>
              </h3>
              <span className="text-xs text-gray-500">Real-time customer analysis</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">(Not visible to customers)</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Metrics Overview */}
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            title="Messages"
            value={messages.filter(m => m.sender === 'user').length}
            icon={<MessageSquare className="w-4 h-4" />}
          />
          <MetricCard
            title="Alerts"
            value={messages.filter(m => m.tone && m.tone.priority > 80).length}
            icon={<AlertTriangle className="w-4 h-4" />}
          />
          <MetricCard
            title="Users"
            value={1}
            icon={<User className="w-4 h-4" />}
          />
        </div>

        {/* Sentiment Graph */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white text-sm font-medium mb-4">Conversation Analysis</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analysisData}>
                <defs>
                  <linearGradient id="colorFrustration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E50914" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUrgency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB13D" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFB13D" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPriority" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2196F3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Frustration"
                  stroke="#E50914"
                  fillOpacity={1}
                  fill="url(#colorFrustration)"
                />
                <Area
                  type="monotone"
                  dataKey="Urgency"
                  stroke="#FFB13D"
                  fillOpacity={1}
                  fill="url(#colorUrgency)"
                />
                <Area
                  type="monotone"
                  dataKey="Priority"
                  stroke="#2196F3"
                  fillOpacity={1}
                  fill="url(#colorPriority)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Info */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <TechInfo icon={<Code />} label="API Version" value="v2.1.0" />
          <TechInfo icon={<GitBranch />} label="Latest Update" value="2h ago" />
          <TechInfo icon={<Shield />} label="Security" value="Enabled" />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }: any) => (
  <div className="bg-gray-800 rounded-lg p-3">
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-xs">{title}</span>
      {icon}
    </div>
    <div className="text-white text-lg font-bold mt-1">{value}</div>
  </div>
);

const TechInfo = ({ icon, label, value }: any) => (
  <div className="flex items-center space-x-2 text-gray-400">
    {icon}
    <span>{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

export default DevAnalytics; 