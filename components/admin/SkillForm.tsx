'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'CyberSecurity' | 'Tools';
  level: number;
  icon?: string;
}

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (skill: Skill) => void;
  onCancel: () => void;
}

const CATEGORIES = ['Frontend', 'Backend', 'CyberSecurity', 'Tools'];

export function SkillForm({ skill, onSubmit, onCancel }: SkillFormProps) {
  const [formData, setFormData] = useState<Skill>(
    skill || {
      id: Date.now().toString(),
      name: '',
      category: 'Frontend',
      level: 80,
      icon: '',
    }
  );

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please fill in the skill name');
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-card border border-border rounded-lg p-6"
    >
      {/* Skill Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Skill Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., React, Node.js"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Proficiency Level */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Proficiency Level: {formData.level}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.level}
          onChange={(e) => handleChange('level', parseInt(e.target.value))}
          className="w-full cursor-pointer"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Drag to set your proficiency level
        </p>
      </div>

      {/* Icon */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Icon (optional)
        </label>
        <input
          type="text"
          value={formData.icon || ''}
          onChange={(e) => handleChange('icon', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., react, nodejs, python"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use icon names from common icon libraries
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {skill ? 'Update Skill' : 'Add Skill'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-muted text-muted-foreground rounded-lg font-semibold hover:shadow-lg transition-smooth"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}
