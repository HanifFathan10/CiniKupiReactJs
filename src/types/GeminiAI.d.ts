type GeminiAIRequest = {
  prompt?: string;
  image?: string;
  mimeType?: string;
};

type GeminiAIResponse = {
  response?: string;
  time?: string;
};

type HistoryGeminiAIResponse = GeminiAIResponse & {
  image?: string;
  user?: string;
  sender?: string;
};
