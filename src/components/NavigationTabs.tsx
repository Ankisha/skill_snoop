import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'yc', label: 'YC Companies' },
    { id: 'xai', label: 'xAI' },
    { id: 'deepmind', label: 'DeepMind' },
    { id: 'meta', label: 'Meta' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-6 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;