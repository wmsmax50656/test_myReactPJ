import React from 'react';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = ['전체', '게임', 'MBTI'];

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 shadow-md sticky top-0 z-10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            나만의 웹사이트 포트폴리오
          </h1>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                aria-current={activeCategory === category ? 'page' : undefined}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
