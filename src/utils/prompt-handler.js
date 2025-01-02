// Utility functions for handling prompts
export function sanitizePrompt(prompt) {
  return prompt.trim().toLowerCase();
}

export function categorizePrompt(prompt) {
  const categories = {
    identity: ['who are you', 'what are you', 'your name'],
    creator: ['who made you', 'who created you', 'who built you'],
    capabilities: ['what can you do', 'what do you do'],
    technical: ['explain', 'how does', 'what is'],
    general: []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => prompt.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
}