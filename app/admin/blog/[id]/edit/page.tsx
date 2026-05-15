'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { BlogForm } from '@/components/admin/BlogForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

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

export default function EditBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blog_posts', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [user, router, postId]);

  const handleSubmit = async (updatedPost: BlogPost) => {
    try {
      await updateDoc(doc(db, 'blog_posts', postId), {
        title: updatedPost.title,
        excerpt: updatedPost.excerpt,
        content: updatedPost.content,
        category: updatedPost.category,
        tags: updatedPost.tags,
        featured: updatedPost.featured,
        published: updatedPost.published,
        publishedAt: updatedPost.publishedAt,
        updatedAt: serverTimestamp(),
      });
      toast.success('Blog post updated successfully');
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error('Failed to update blog post');
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading post...</div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-destructive">Post not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
            <p className="text-muted-foreground mt-2">
              Update your blog article
            </p>
          </div>
          <BlogForm
            post={post}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
