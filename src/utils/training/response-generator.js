import { TRAINING_RESPONSES } from '../../data/training/responses';

export function generateResponse(category, prompt) {
  return {
    text: formatResponseText(prompt),
    metadata: getResponseMetadata(category)
  };
}

function formatResponseText(prompt) {
  const greeting = getRandomElement(TRAINING_RESPONSES.greetings);
  const transition = getRandomElement(TRAINING_RESPONSES.transitions);
  return `${greeting} ${transition}${prompt}`;
}

function getResponseMetadata(category) {
  return {
    category,
    timestamp: new Date().toISOString(),
    provider: 'Literally Labs'
  };
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}