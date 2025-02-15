export type ToneAnalysis = {
  frustration: number;
  urgency: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  abusive: boolean;
  priority: number;
};

export const generateAIResponse = async (message: string, context: string): Promise<string> => {
  try {
    return fallbackResponse(message, context);
  } catch (error) {
    console.error('AI Response Error:', error);
    return fallbackResponse(message, context);
  }
};

export const analyzeTone = (text: string): ToneAnalysis => {
  const criticalWords = [
    'hacked', 'unauthorized', 'emergency', 'immediately',
    'urgent', 'asap', 'right now', 'critical', 'serious',
    'charged twice', 'double charge', 'multiple charges',
    'broken', 'not working', 'completely broken'
  ];

  const frustrationWords = [
    'frustrated', 'angry', 'upset', 'terrible', 'worst',
    'annoyed', 'furious', 'mad', 'horrible', 'awful',
    'ridiculous', 'unacceptable', 'wrong', 'fix this',
    'serious issue', 'major problem', 'HELP', 'need help'
  ];
  
  const urgencyWords = [
    'need help now', 'emergency', 'asap', 'urgent',
    'immediate', 'quick', 'fast', 'critical',
    'right now', 'need refund', 'fix immediately',
    'help right now', 'urgent assistance', 'immediately'
  ];

  const text_lower = text.toLowerCase();
  
  let frustrationScore = 20;
  let urgencyScore = 20;
  let criticalScore = 0;

  criticalWords.forEach(word => {
    if (text_lower.includes(word)) {
      criticalScore += 50;
    }
  });

  frustrationWords.forEach(word => {
    if (text_lower.includes(word)) {
      frustrationScore += 45;
    }
  });

  urgencyWords.forEach(word => {
    if (text_lower.includes(word)) {
      urgencyScore += 45;
    }
  });

  if (text_lower.includes('hacked') || text_lower.includes('unauthorized')) {
    criticalScore += 70;
    urgencyScore += 60;
  }

  if (text_lower.includes('charged twice') || 
      (text_lower.includes('charged') && text_lower.includes('twice'))) {
    criticalScore += 65;
    frustrationScore += 60;
  }

  if (text_lower.includes('immediate refund') || text_lower.includes('money back')) {
    urgencyScore += 55;
    frustrationScore += 50;
  }

  if ((text_lower.match(/urgent|immediate|asap/g) || []).length > 1) {
    urgencyScore += 60;
  }

  if ((text_lower.match(/broken|not working|problem/g) || []).length > 1) {
    frustrationScore += 60;
  }

  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 0) {
    frustrationScore += exclamationCount * 15;
    urgencyScore += exclamationCount * 15;
  }

  if (text.match(/[A-Z]{2,}/)) {
    frustrationScore += 40;
    urgencyScore += 40;
  }

  const finalFrustration = Math.min(frustrationScore + criticalScore, 100);
  const finalUrgency = Math.min(urgencyScore + criticalScore, 100);

  const priority = Math.min(
    ((finalFrustration + finalUrgency) / 2) + (criticalScore * 1.5),
    100
  );

  return {
    frustration: finalFrustration / 100,
    urgency: finalUrgency / 100,
    sentiment: finalFrustration > 30 ? 'negative' : 'neutral',
    abusive: text_lower.includes('terrible service') || text_lower.includes('worst'),
    priority
  };
};

const fallbackResponse = (message: string, context: string): string => {
  const keywords = message.toLowerCase();
  
  if (context.includes("Billing")) {
    if (keywords.includes("refund")) {
      return "I understand you need a refund. Could you please provide:\n1. The date of charge\n2. The amount charged\n3. The reason for refund";
    }
    if (keywords.includes("charged") || keywords.includes("payment")) {
      return "I'll help you with your billing concern. To assist you better, please provide:\n1. The date of the charge\n2. The amount in question\n3. Your payment method";
    }
  }

  if (context.includes("Streaming")) {
    if (keywords.includes("buffer") || keywords.includes("slow")) {
      return "Let's fix your streaming issue. Please:\n1. Run a speed test at fast.com\n2. Tell me your current device\n3. Confirm if this happens on all shows";
    }
    if (keywords.includes("quality") || keywords.includes("resolution")) {
      return "To improve your video quality, let's check:\n1. Your internet speed\n2. Your Netflix plan settings\n3. Your device settings";
    }
  }

  if (context.includes("Account")) {
    if (keywords.includes("password") || keywords.includes("login")) {
      return "I can help you with account access. Would you like to:\n1. Reset your password\n2. Recover your email\n3. Check login devices";
    }
    if (keywords.includes("profile") || keywords.includes("settings")) {
      return "For profile management, I can help you:\n1. Create a new profile\n2. Modify existing profiles\n3. Set up parental controls";
    }
  }

  return "I understand you need assistance. Could you please provide more details about your issue, or select one of the quick reply options above?";
}; 