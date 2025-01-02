import { DATASET_INFO } from '../data/dataset-info';
import { MODEL_CONFIG } from '../config/model-config';
import { logger } from '../utils/logger';

class LiterallyService {
  constructor() {
    this.datasetInfo = DATASET_INFO;
    this.modelConfig = MODEL_CONFIG;
    this.context = [];
  }

  async initialize() {
    try {
      logger.info('Initializing Literally Labs AI service');
      await this.setupModel();
      return true;
    } catch (error) {
      logger.error('Initialization error:', error);
      return false;
    }
  }

  async setupModel() {
    const config = {
      ...this.modelConfig.settings,
      branding: {
        provider: this.modelConfig.provider,
        copyright: this.datasetInfo.organization.copyright
      }
    };
    
    return config;
  }

  getModelInfo() {
    return {
      name: this.modelConfig.name,
      version: this.modelConfig.version,
      provider: this.modelConfig.provider,
      dataset: {
        name: this.datasetInfo.name,
        version: this.datasetInfo.version,
        maintainer: this.datasetInfo.metadata.maintainer
      }
    };
  }
}

export const literallyService = new LiterallyService();