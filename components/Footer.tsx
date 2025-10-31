import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 shadow-inner mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} 뭉탱이월드. All Rights Reserved.
        </p>
        <p>
          뭉탱교회 주소: 뭉탱도 뭉탱로 3000번길 MTE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
