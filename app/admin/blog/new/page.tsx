'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { BlogForm } from '@/components/admin/BlogForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  createdAt: string;
}

export default function NewBlogPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const handleSubmit = async (post: BlogPost) => {
    try {
      await addDoc(collection(db, 'blog_posts'), {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        featured: post.featured,
        published: post.published,
        publishedAt: post.publishedAt,
        createdAt: serverTimestamp(),
      });
      toast.success('Blog post published successfully');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to publish blog post');
    }
  };

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Write New Post</h1>
            <p className="text-muted-foreground mt-2">
              Create and publish a new blog article
            </p>
          </div>
          <BlogForm onSubmit={handleSubmit} onCancel={() => router.back()} />
        </div>
      </main>
    </div>
  );
}
