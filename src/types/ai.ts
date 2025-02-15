export type AIResponse = {
  generated_text: string;
  confidence: number;
};

export type AIContext = {
  category: string;
  topic?: string;
  predefinedResponse?: string;
}; 