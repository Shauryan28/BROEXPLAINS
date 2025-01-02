import { GoogleGenerativeAI } from '@google/generative-ai';
import { BOT_CONFIG } from '../config/bot-config.js';
import { logger } from '../utils/logger.js';
import { generatePrompt } from '../utils/prompt-templates.js';
import { modelTraining } from './model-training.js';

class ExplanationService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(BOT_CONFIG.apiKey);
    this.initializeModel();
    this.context = [];
  }

  async initializeModel() {
    try {
      const trainingConfig = await modelTraining.applyTrainingToModel();
      this.model = this.genAI.getGenerativeModel({ 
        model: BOT_CONFIG.model,
        generationConfig: trainingConfig
      });
    } catch (error) {
      logger.error('Model initialization error:', error);
      throw new Error('Failed to initialize model with training data');
    }
  }

  async generateExplanation(topic) {
    try {
      this.context.push({ role: 'user', content: topic });
      
      const prompt = this.context.length === 1 
        ? generatePrompt('base', { topic })
        : generatePrompt('followUp', { 
            topic,
            aspect: this.extractMainAspect(topic)
          });

      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }]}],
        generationConfig: {
          stopSequences: ["Human:", "User:"]
        }
      });

      const explanation = result.response.text();
      
      this.context.push({ role: 'assistant', content: explanation });
      if (this.context.length > 8) {
        this.context = this.context.slice(-8);
      }

      return this.formatResponse(explanation);

    } catch (error) {
      logger.error('Explanation generation error:', error);
      return "Bro, I'm having trouble explaining that right now. Mind trying again?";
    }
  }

  formatResponse(response) {
    return response
      .trim()
      .replace(/^(BRO EXPLAINS:|Bot:|Assistant:)/i, '')
      .trim();
  }

  extractMainAspect(topic) {
    return topic.split(' ').slice(0, 3).join(' ');
  }

  clearContext() {
    this.context = [];
  }
}

export const explanationService = new ExplanationService();