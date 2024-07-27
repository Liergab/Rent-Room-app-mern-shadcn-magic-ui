// src/components/DarkModeToggle.tsx
import useDarkMode from '@/hooks/userDarkmode';
import React from 'react';
import { FaSun} from 'react-icons/fa';
import { RiMoonClearFill } from "react-icons/ri";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <button
      className="relative w-14 h-8 md:w-20 md:h-10 bg-white dark:bg-bleached-cedar-950  rounded-full flex items-center justify-between p-[7px] cursor-pointer border-2 border-bleached-cedar-700"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <span
        className={`absolute w-4 h-4 md:w-8 md:h-8 bg-bleached-cedar-500 rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-6 md:translate-x-8' : 'translate-x-0'
        }`}
      />
      <FaSun className={`w-3 h-3 md:w-5 md:h-5 text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-100'}`} />
      <RiMoonClearFill className={`w-3 h-3 md:w-5 md:h-5 text-bleached-cedar-900 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-100'}`} />
    </button>
  );
};

export default DarkModeToggle;
