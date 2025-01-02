import { generateTrainingSet } from '../utils/training-utils';
import { BASE_EXAMPLES } from '../data/training-data';
import { BOT_CONFIG } from '../config/bot-config';
import { logger } from '../utils/logger';

class ModelTraining {
    constructor() {
        this.trainingSet = generateTrainingSet(BASE_EXAMPLES);
        this.modelConfig = {
            temperature: 0.7,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 1024,
        };
    }

    async applyTrainingToModel(model) {
        try {
            logger.interaction('Applying training examples to model configuration');
            
            // Apply training examples to model's context
            const trainingContext = this.trainingSet.map(example => ({
                role: 'example',
                input: example.prompt,
                output: example.response
            }));

            // Update model configuration with training context
            return {
                ...this.modelConfig,
                trainingExamples: trainingContext,
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };
        } catch (error) {
            logger.error('Error applying training to model:', error);
            throw new Error('Failed to apply training configuration');
        }
    }
}

export const modelTraining = new ModelTraining();