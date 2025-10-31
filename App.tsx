import React, { useState, useEffect } from 'react';
import { Website } from './types';
import Header from './components/Header';
import WebsiteCard from './components/WebsiteCard';
import WebsiteFormModal from './components/WebsiteFormModal';
import { PlusIcon } from './components/icons/PlusIcon';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    // Load websites from localStorage or use initial data
    try {
      const storedWebsites = localStorage.getItem('websites');
      if (storedWebsites) {
        setWebsites(JSON.parse(storedWebsites));
      } else {
        // Initial dummy data if nothing is stored
        const initialWebsites: Website[] = [
          {
            id: '1',
            title: 'My Awesome Blog',
            description: 'A personal blog about web development, design, and technology. Updated weekly.',
            imageUrl: 'https://picsum.photos/seed/blog/600/400',
            url: '#',
            category: 'MBTI',
          },
          {
            id: '2',
            title: 'E-commerce Store',
            description: 'An online store selling handcrafted goods. Built with React and Node.js.',
            imageUrl: 'https://picsum.photos/seed/store/600/400',
            url: '#',
            category: '게임',
          },
          {
            id: '3',
            title: 'Photography Portfolio',
            description: 'A showcase of my landscape and portrait photography from around the world.',
            imageUrl: 'https://picsum.photos/seed/portfolio/600/400',
            url: '#',
            category: 'MBTI',
          },
        ];
        setWebsites(initialWebsites);
        localStorage.setItem('websites', JSON.stringify(initialWebsites));
      }
    } catch (error) {
      console.error("Failed to load websites from localStorage", error);
    }
  }, []);
  
  const updateLocalStorage = (updatedWebsites: Website[]) => {
    localStorage.setItem('websites', JSON.stringify(updatedWebsites));
  };

  const handleOpenModalForCreate = () => {
    setEditingWebsite(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (website: Website) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWebsite(null);
  };

  const handleSaveWebsite = (websiteData: Omit<Website, 'id'> & { id?: string }) => {
    let updatedWebsites;
    if (editingWebsite) {
      updatedWebsites = websites.map((w) =>
        w.id === editingWebsite.id ? { ...w, ...websiteData, id: editingWebsite.id } : w
      );
    } else {
       const newWebsite: Website = {
        id: new Date().getTime().toString(),
        ...websiteData,
       };
       updatedWebsites = [...websites, newWebsite];
    }
    setWebsites(updatedWebsites);
    updateLocalStorage(updatedWebsites);
    handleCloseModal();
  };

  const handleDeleteWebsite = (id: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      const updatedWebsites = websites.filter((w) => w.id !== id);
      setWebsites(updatedWebsites);
      updateLocalStorage(updatedWebsites);
    }
  };
  
  const filteredWebsites = websites.filter(website => 
    activeCategory === '전체' || website.category === activeCategory
  );

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col">
      <Header activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">내 웹사이트 목록</h2>
          <button
            onClick={handleOpenModalForCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition-colors"
          >
            <PlusIcon />
            <span>새 웹사이트 추가</span>
          </button>
        </div>

        {filteredWebsites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website) => (
              <WebsiteCard
                key={website.id}
                website={website}
                onEdit={() => handleOpenModalForEdit(website)}
                onDelete={() => handleDeleteWebsite(website.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
               {activeCategory === '전체' ? '웹사이트가 없습니다.' : `'${activeCategory}' 카테고리에 웹사이트가 없습니다.`}
            </h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
             {activeCategory === '전체' 
                ? "'새 웹사이트 추가' 버튼을 눌러 첫 번째 웹사이트를 추가하세요."
                : '다른 카테고리를 선택하거나 이 카테고리에 새 웹사이트를 추가하세요.'}
            </p>
          </div>
        )}
      </main>

      <WebsiteFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveWebsite}
        initialData={editingWebsite}
      />
      <Footer />
    </div>
  );
};

export default App;