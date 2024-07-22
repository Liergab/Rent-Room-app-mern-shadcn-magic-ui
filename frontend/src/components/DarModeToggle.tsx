// src/components/DarkModeToggle.tsx
import useDarkMode from '@/hooks/userDarkmode';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';


const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <button
      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-between p-1 cursor-pointer"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <span
        className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <FaSun className={`w-4 h-4 text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-100'}`} />
      <FaMoon className={`w-4 h-4 text-gray-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-100'}`} />
    </button>
  );
};

export default DarkModeToggle;
