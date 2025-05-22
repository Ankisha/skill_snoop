import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface SkillTag {
  skill: string;
  frequency: number;
}

interface SkillTagsProps {
  title: string;
}

const SkillTags: React.FC<SkillTagsProps> = ({ title }) => {
  const [skills, setSkills] = useState<SkillTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skill_frequencies')
          .select('skill, frequency')
          .eq('category', title)
          .order('frequency', { ascending: false })
          .limit(20);

        if (error) throw error;
        setSkills(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [title]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-medium p-4 bg-gray-50 text-gray-800 border-b">{title}</h3>
        <div className="p-4">
          <div className="animate-pulse flex space-x-2">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-medium p-4 bg-gray-50 text-gray-800 border-b">{title}</h3>
        <div className="p-4 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
      <h3 className="text-lg font-medium p-4 bg-gray-50 text-gray-800 border-b">{title}</h3>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              <span>{skill.skill}</span>
              <span className="ml-1 text-indigo-600">({skill.frequency})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillTags;