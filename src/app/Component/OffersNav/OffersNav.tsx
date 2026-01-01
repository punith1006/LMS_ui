import React from 'react';

interface CourseNavProps {
  activeTab: 'Courses' | 'webinars';
  onTabChange: (tab: 'Courses' | 'webinars') => void;
}

const OffersNav: React.FC<CourseNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center items-center space-x-8 mb-8">
      <button 
        onClick={() => onTabChange('Courses')}
        className={`text-2xl font-bold transition-colors ${
          activeTab === 'Courses' 
            ? 'text-white' 
            : 'text-gray-400 hover:text-lavender-300'
        }`}
      >
       Courses
      </button>
      <span className="text-gray-600 text-2xl">|</span>
      <button 
        onClick={() => onTabChange('webinars')}
        className={`text-2xl font-bold transition-colors ${
          activeTab === 'webinars' 
            ? 'text-white' 
            : 'text-gray-400 hover:text-lavender-300'
        }`}
      >
        Webinars
      </button>
    </div>
  );
};

export default OffersNav; 