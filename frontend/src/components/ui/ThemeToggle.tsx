import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full
        bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200
        hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
};

export default ThemeToggle;
