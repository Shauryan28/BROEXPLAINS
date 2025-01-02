import React, { forwardRef } from 'react';

export const MessageInputField = forwardRef(({ value, onChange, disabled }, ref) => (
  <input
    ref={ref}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Ask me to explain anything..."
    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors duration-200"
    disabled={disabled}
  />
));