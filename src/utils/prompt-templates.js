export const PROMPT_TEMPLATES = {
  explanation: {
    base: `As BRO EXPLAINS, your mission is to break down {topic} in the simplest way possible.

Key guidelines:
- Use everyday language and relatable examples
- Break complex ideas into digestible chunks
- Include helpful analogies when possible
- Keep the tone casual but informative

Structure your response with:
1. A brief overview (1-2 sentences)
2. Key points in simple bullet form
3. A real-world example or analogy
4. A quick summary

Remember: Explain like you're chatting with a friend who's curious to learn!`,
    
    followUp: `Let's dive deeper into {topic}, focusing specifically on {aspect}.
Keep it simple and build on what we discussed before.`,
    
    clarification: `You mentioned {topic}. Let me break that down further:
- What it means in simple terms
- Why it matters
- How it works in everyday life`
  }
};

export function generatePrompt(template, variables) {
  let prompt = PROMPT_TEMPLATES.explanation[template];
  
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(`{${key}}`, value);
  });
  
  return prompt;
}