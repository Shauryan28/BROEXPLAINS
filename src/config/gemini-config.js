export const GEMINI_CONFIG = {
  apiKey: "AIzaSyBDeji1lnBKVXmmhpfVT4Km7ekrRoCpTgk",
  model: "gemini-2.0-flash-exp",
  generation: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
  },
  safety: {
    harassment: "MEDIUM",
    hateSpeech: "MEDIUM"
  }
};