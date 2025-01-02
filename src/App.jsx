import React from 'react';
import ChatInterface from './components/ChatInterface';
import { BotProvider } from './contexts/BotContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BotProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <ChatInterface />
        </div>
      </BotProvider>
    </ThemeProvider>
  );
}

export default App;