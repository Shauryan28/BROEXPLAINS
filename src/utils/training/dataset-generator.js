import { BASE_EXAMPLES } from '../../data/training/base-examples';

export function generateTrainingSet(baseExamples = BASE_EXAMPLES, totalExamples = 300) {
  const trainingSet = [...baseExamples];
  
  for (let i = baseExamples.length; i < totalExamples; i++) {
    const baseExample = baseExamples[i % baseExamples.length];
    const newExample = createVariation(baseExample, i);
    trainingSet.push(newExample);
  }
  
  return trainingSet;
}

function createVariation(baseExample, index) {
  return {
    prompt: addVariation(baseExample.prompt, index),
    response: baseExample.response
  };
}

function addVariation(prompt, index) {
  const prefixes = [
    "Hey bro, ",
    "Could you explain ",
    "I'm curious about ",
    "What's the deal with ",
    "Tell me about "
  ];
  
  const prefix = prefixes[index % prefixes.length];
  const suffix = ` (Example ${index})`;
  
  return `${prefix}${prompt.toLowerCase()}${suffix}`;
}