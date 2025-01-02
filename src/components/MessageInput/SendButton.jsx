import React from 'react';
import { FiSend } from 'react-icons/fi';

export const SendButton = ({ disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-gray-400 dark:disabled:bg-gray-600"
  >
    <FiSend size={20} />
  </button>
);