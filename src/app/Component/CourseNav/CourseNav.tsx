import React from 'react';

interface CourseNavProps {
  activeTab: 'courses' | 'certifications';
  onTabChange: (tab: 'courses' | 'certifications') => void;
}

const CourseNav: React.FC<CourseNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center items-center space-x-8 mb-8">
      <button
        onClick={() => onTabChange('courses')}
        className={`text-2xl font-bold transition-colors ${activeTab === 'courses'
          ? 'text-black'
          : 'text-gray-400 hover:text-blue'
          }`}
      >
        Courses
      </button>
      <span className="text-gray-600 text-2xl">|</span>
      <button
        onClick={() => onTabChange('certifications')}
        className={`text-2xl font-bold transition-colors ${activeTab === 'certifications'
          ? 'text-black'
          : 'text-gray-400 hover:text-blue'
          }`}
      >
        Certifications
      </button>
    </div>
  );
};

export default CourseNav; 