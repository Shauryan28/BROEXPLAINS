import { geminiClient } from './client';
import { formatPrompt } from '../../utils/prompt-utils';
import { logger } from '../../utils/logger';

class GeminiChatService {
  constructor() {
    this.context = [];
  }

  async sendMessage(message) {
    try {
      const prompt = formatPrompt(message, this.context);
      const response = await geminiClient.generateContent(prompt);
      
      this.updateContext(message, response);
      
      return response;
    } catch (error) {
      logger.error('Chat service error:', error);
      return "Bro, I'm having trouble with that right now. Mind trying again?";
    }
  }

  updateContext(message, response) {
    this.context.push(
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    );

    // Keep context manageable
    if (this.context.length > 8) {
      this.context = this.context.slice(-8);
    }
  }

  clearContext() {
    this.context = [];
  }
}

export const geminiChatService = new GeminiChatService();