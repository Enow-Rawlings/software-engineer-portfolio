'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

export default function AdminBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!user) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'blog_posts'));
      const postList: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        postList.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      setPosts(postList);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    fetchPosts();
  }, [user, router]);

  const deleteBlogPost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      setPosts(posts.filter((p) => p.id !== id));
      toast.success('Blog post deleted');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      const post = posts.find((p) => p.id === id);
      if (!post) return;

      await updateDoc(doc(db, 'blog_posts', id), {
        featured: !post.featured,
      });

      setPosts(posts.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      ));
      toast.success('Blog post updated');
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error('Failed to update blog post');
    }
  };

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 lg:ml-0">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
              <p className="text-muted-foreground mt-2">
                Create and manage your blog articles
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/blog/new')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Post
            </button>
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-muted-foreground">Loading blog posts...</div>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 rounded-lg bg-card border border-border"
            >
              <p className="text-muted-foreground mb-4">
                No blog posts yet. Write your first article!
              </p>
              <button
                onClick={() => router.push('/admin/blog/new')}
                className="btn-primary"
              >
                Create Post
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold">
                            Featured
                          </span>
                        )}
                        {!post.published && (
                          <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded text-xs font-semibold">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={16} />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <span className="text-primary font-medium">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleFeatured(post.id)}
                        className="px-3 py-2 text-sm rounded-lg hover:bg-muted transition-smooth"
                        title={post.featured ? 'Remove featured' : 'Mark featured'}
                      >
                        {post.featured ? '⭐' : '☆'}
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/blog/${post.id}/edit`)
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-smooth"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteBlogPost(post.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-smooth text-destructive"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
