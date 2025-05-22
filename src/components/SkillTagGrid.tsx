import React from 'react';
import SkillTags from './SkillTagItem';

interface SkillTagGridProps {
  category: string;
}

const CATEGORIES = [
  'Programming Languages',
  'Frameworks or Libraries',
  'ML DL Algorithms',
  'ML Lifecycle Stage',
  'Data Handling or Engineering Tools',
  'MLOps Production Infrastructure',
  'Problem Modality Domain',
  'GenAI LLM-Specific Skills',
  'Others'
];

const SkillTagGrid: React.FC<SkillTagGridProps> = ({ category }) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((title, index) => (
          <SkillTags 
            key={index}
            title={title}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillTagGrid;