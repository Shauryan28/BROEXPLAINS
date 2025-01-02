import { SYSTEM_INSTRUCTIONS } from '../config/system-instructions';
import { TRAINING_CATEGORIES } from '../data/training/categories';
import { 
  categorizePrompt, 
  validatePrompt, 
  generateResponse 
} from '../utils/training-utils';
import { logger } from '../utils/logger';

class TrainingService {
  constructor() {
    this.instructions = SYSTEM_INSTRUCTIONS;
    this.categories = TRAINING_CATEGORIES;
  }

  async processPrompt(prompt) {
    try {
      const { isValid, sanitized } = validatePrompt(prompt);
      if (!isValid) {
        return this.getFallbackResponse();
      }

      const category = categorizePrompt(sanitized, this.categories);
      const response = generateResponse(category, sanitized);
      
      return this.validateResponse(response) ? 
        response.text : 
        this.getFallbackResponse();
    } catch (error) {
      logger.error('Error processing prompt:', error);
      return this.getFallbackResponse();
    }
  }

  validateResponse(response) {
    return this.instructions.rules.every(rule => 
      this.responseFollowsRule(response.text, rule)
    );
  }

  responseFollowsRule(response, rule) {
    // Basic rule validation implementation
    const ruleChecks = {
      "friendly": () => /!|\?|bro|hey|yo/i.test(response),
      "simple": () => response.split(' ').every(word => word.length < 15),
      "concise": () => response.length < 500
    };

    const check = ruleChecks[rule.toLowerCase().split(' ')[0]];
    return check ? check() : true;
  }

  getFallbackResponse() {
    return "Yo! Let me explain that in a simpler way...";
  }
}

export const trainingService = new TrainingService();