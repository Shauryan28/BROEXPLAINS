export function formatPrompt(message, context = []) {
  // Format the conversation history and current message
  const history = context.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  return {
    contents: [
      ...history,
      {
        role: "user",
        parts: [{ text: message }]
      }
    ]
  };
}