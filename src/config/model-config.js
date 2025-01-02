// Model configuration settings
export const MODEL_CONFIG = {
  name: "BRO EXPLAINs",
  version: "1.0.0",
  provider: "Literally Labs",
  settings: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain"
  },
  safetySettings: [
    {
      category: "HARASSMENT",
      threshold: "MEDIUM"
    },
    {
      category: "HATE_SPEECH",
      threshold: "MEDIUM"
    }
  ]
};