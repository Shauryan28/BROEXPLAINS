import React, { useState } from 'react';
import { useBot } from '../../contexts/BotContext';
import { useAutoFocus } from '../../hooks/useAutoFocus';
import { MessageInputField } from './MessageInputField';
import { SendButton } from './SendButton';

function MessageInput() {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useBot();
  const inputRef = useAutoFocus([isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-colors duration-200"
    >
      <div className="flex space-x-4">
        <MessageInputField
          ref={inputRef}
          value={input}
          onChange={setInput}
          disabled={isLoading}
        />
        <SendButton disabled={!input.trim() || isLoading} />
      </div>
    </form>
  );
}

export default MessageInput;