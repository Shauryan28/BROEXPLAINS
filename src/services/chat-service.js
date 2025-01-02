import { MODEL_CONFIG } from '../config/model-config';
import { CHAT_CONFIG } from '../config/chat-config';
import { logger } from '../utils/logger';

class ChatService {
  constructor() {
    this.config = MODEL_CONFIG;
    this.chatConfig = CHAT_CONFIG;
    this.history = [...this.chatConfig.initialHistory];
  }

  async sendMessage(message) {
    try {
      // Add user message to history
      this.history.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Generate response based on history and configuration
      const response = await this.generateResponse(message);

      // Add response to history
      this.history.push({
        role: "model",
        parts: [{ text: response }]
      });

      return response;
    } catch (error) {
      logger.error('Error sending message:', error);
      throw new Error('Failed to process message');
    }
  }

  async generateResponse(message) {
    // Handle special cases
    if (this.isIdentityQuestion(message)) {
      return this.chatConfig.defaultResponses.identity;
    }
    if (this.isCreatorQuestion(message)) {
      return this.chatConfig.defaultResponses.creator;
    }
    if (this.isCapabilitiesQuestion(message)) {
      return this.chatConfig.defaultResponses.capabilities;
    }

    // Generate response for other questions
    // Implementation would go here
    return "Let me explain that in a simple way...";
  }

  isIdentityQuestion(message) {
    const identityKeywords = ['who are you', 'what are you', "what's your name", 'your name'];
    return identityKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  isCreatorQuestion(message) {
    const creatorKeywords = ['who made you', 'who created you', 'who built you'];
    return creatorKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  isCapabilitiesQuestion(message) {
    const capabilityKeywords = ['what can you do', 'what do you do', 'your capabilities'];
    return capabilityKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  clearHistory() {
    this.history = [...this.chatConfig.initialHistory];
  }
}

export const chatService = new ChatService();