'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt: string;
  image?: string;
  createdAt: string;
}

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (post: BlogPost) => void;
  onCancel: () => void;
}

const CATEGORIES = ['Software Development', 'Cybersecurity', 'CTF Writeups', 'Career & Learning'] as const;

export function BlogForm({ post, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>(
    post || {
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      category: 'Software Development',
      tags: [],
      featured: false,
      published: true,
      publishedAt: new Date().toISOString(),
      image: '',
      createdAt: new Date().toISOString(),
    }
  );

  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const storageReference = storageRef(storage, `blog_images/${formData.id}-${file.name}`);
      await uploadBytes(storageReference, file);
      const url = await getDownloadURL(storageReference);
      setFormData({ ...formData, image: url });
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
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
          Post Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Getting Started with React 18"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Excerpt *
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          rows={2}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Brief summary of your blog post"
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading image...</p>}
        {formData.image && (
          <img
            src={formData.image}
            alt="Cover preview"
            className="mt-3 w-full max-h-64 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Category
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

      {/* Tags */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., React"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-smooth"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <motion.div
              key={tag}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Content (Markdown) *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={10}
          className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
          placeholder="Write your blog post in Markdown format..."
        />
        <p className="text-xs text-muted-foreground mt-2">
          You can use Markdown formatting for headings, lists, code blocks, etc.
        </p>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => handleChange('published', e.target.checked)}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer">
            Publish this post
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
            Mark as featured
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 btn-primary"
        >
          {post ? 'Update Post' : 'Publish Post'}
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
