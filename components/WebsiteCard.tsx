
import React from 'react';
import type { Website } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface WebsiteCardProps {
  website: Website;
  onEdit: () => void;
  onDelete: () => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onEdit, onDelete }) => {
  const handleUrlClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent navigation if the click is on a button
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
      <a href={website.url} target="_blank" rel="noopener noreferrer" onClick={handleUrlClick} className="block">
        <img
          className="w-full h-48 object-cover"
          src={website.imageUrl || 'https://picsum.photos/600/400'}
          alt={website.title}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {website.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm h-20 overflow-hidden text-ellipsis">
            {website.description}
          </p>
        </div>
      </a>
      <div className="px-6 pb-4 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
        <button
          onClick={onEdit}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Edit website"
        >
          <PencilIcon />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Delete website"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default WebsiteCard;
