'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  visible: boolean;
  category: 'Full Stack' | 'Cybersecurity' | 'Tools & Scripts';
  createdAt: string;
}

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

const CATEGORIES = ['Full Stack', 'Cybersecurity', 'Tools & Scripts'] as const;

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      technologies: [],
      github: '',
      demo: '',
      visible: true,
      category: 'Full Stack',
      createdAt: new Date().toISOString(),
    }
  );

  const [techInput, setTechInput] = useState('');

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
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
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Project Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., E-Commerce Platform"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Describe your project..."
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Project Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-4 w-full max-h-64 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Project Category *
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

      {/* Technologies */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Technologies
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
            className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., React"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-smooth"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech) => (
            <motion.div
              key={tech}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-destructive transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Live Demo URL
          </label>
          <input
            type="url"
            value={formData.demo}
            onChange={(e) => handleChange('demo', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Visibility */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="visible"
          checked={formData.visible}
          onChange={(e) => handleChange('visible', e.target.checked)}
          className="w-4 h-4 rounded border-border cursor-pointer"
        />
        <label htmlFor="visible" className="text-sm font-medium text-foreground cursor-pointer">
          Visible on portfolio
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {project ? 'Update Project' : 'Create Project'}
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
