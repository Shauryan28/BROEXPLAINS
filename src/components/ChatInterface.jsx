import React from 'react';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import Header from './Header';
import { useBot } from '../contexts/BotContext';

function ChatInterface() {
  const { clearChat } = useBot();

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      <Header onClear={clearChat} />
      <ChatMessages />
      <MessageInput />
    </div>
  );
}

export default ChatInterface;