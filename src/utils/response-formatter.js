// Utility functions for formatting responses
export function formatResponse(response) {
  return {
    text: response.trim(),
    metadata: {
      provider: "Literally Labs",
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    }
  };
}

export function addPersonality(response) {
  const interjections = ["Oh, ", "Hey, ", "Alright, ", "Cool! ", "Check this out - "];
  const randomInterjection = interjections[Math.floor(Math.random() * interjections.length)];
  
  return `${randomInterjection}${response}`;
}