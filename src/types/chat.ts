export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  tone?: {
    frustration: number;
    urgency: number;
    priority: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    abusive: boolean;
  };
};

export type QuickReply = {
  text: string;
  action: string;
};

export type CategoryData = {
  title: string;
  quickReplies: QuickReply[];
  responses: Record<string, string>;
}; 