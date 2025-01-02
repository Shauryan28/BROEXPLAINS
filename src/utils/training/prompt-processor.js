export function categorizePrompt(prompt, categories) {
  const lowercasePrompt = prompt.toLowerCase();
  
  for (const [category, data] of Object.entries(categories)) {
    if (matchesCategory(lowercasePrompt, data)) {
      return category;
    }
  }
  
  return 'general';
}

function matchesCategory(prompt, categoryData) {
  return categoryData.examples.some(ex => 
    prompt.includes(ex.prompt.toLowerCase())
  );
}

export function validatePrompt(prompt) {
  return {
    isValid: prompt.length > 0 && prompt.length < 500,
    sanitized: sanitizePrompt(prompt)
  };
}

function sanitizePrompt(prompt) {
  return prompt
    .trim()
    .replace(/[<>]/g, '')
    .toLowerCase();
}