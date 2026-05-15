'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface ExperienceFormProps {
  experience?: Experience;
  onSubmit: (experience: Experience) => void;
  onCancel: () => void;
}

export function ExperienceForm({ experience, onSubmit, onCancel }: ExperienceFormProps) {
  const [formData, setFormData] = useState<Experience>(
    experience || {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
    }
  );

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.position || !formData.startDate) {
      alert('Please fill in all required fields');
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
      {/* Company */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Tech Startup Inc."
        />
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Job Title *
        </label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Senior Developer"
        />
      </div>

      {/* Dates */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Start Date *
          </label>
          <input
            type="month"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            End Date {formData.current ? '(Current)' : ''}
          </label>
          <input
            type="month"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.current}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>
      </div>

      {/* Currently Working */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) => handleChange('current', e.target.checked)}
          className="w-4 h-4 rounded border-border cursor-pointer"
        />
        <label htmlFor="current" className="text-sm font-medium text-foreground cursor-pointer">
          I currently work here
        </label>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Duration (e.g., "Jan 2020 - Dec 2022")
        </label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Auto-generated or enter manually"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe your responsibilities and achievements..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {experience ? 'Update Experience' : 'Add Experience'}
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
