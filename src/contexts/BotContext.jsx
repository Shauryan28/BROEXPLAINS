import React, { createContext, useContext, useState, useCallback } from 'react';
import { explanationService } from '../services/explanation-service';
import { BOT_CONFIG } from '../config/bot-config';

const BotContext = createContext();

export function BotProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownIntro, setHasShownIntro] = useState(false);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const newMessage = { role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      if (!hasShownIntro) {
        setHasShownIntro(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: BOT_CONFIG.defaultGreeting,
          timestamp: new Date()
        }]);
      }

      const explanation = await explanationService.generateExplanation(content);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: explanation,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error generating explanation:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Bro, something went wrong! Can you try asking that again?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [hasShownIntro]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setHasShownIntro(false);
    explanationService.clearContext();
  }, []);

  return (
    <BotContext.Provider value={{ messages, isLoading, sendMessage, clearChat }}>
      {children}
    </BotContext.Provider>
  );
}

export function useBot() {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBot must be used within a BotProvider');
  }
  return context;
}