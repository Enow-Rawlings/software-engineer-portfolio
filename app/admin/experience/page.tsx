'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  skills: string[];
  startDate: string;
  endDate?: string;
  current?: boolean;
}

export default function AdminExperiencePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    if (!user) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const expList: Experience[] = [];
      querySnapshot.forEach((doc) => {
        expList.push({ id: doc.id, ...doc.data() } as Experience);
      });
      setExperiences(expList);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    fetchExperiences();
  }, [user, router]);

  const deleteExperience = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'experiences', id));
      setExperiences(experiences.filter((e) => e.id !== id));
      toast.success('Experience deleted');
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
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
              <h1 className="text-3xl font-bold text-foreground">Experience</h1>
              <p className="text-muted-foreground mt-2">
                Manage your work experience
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/experience/new')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Experience
            </button>
          </div>

          {/* Experiences List */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-muted-foreground">Loading experiences...</div>
            </div>
          ) : experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 rounded-lg bg-card border border-border"
            >
              <p className="text-muted-foreground mb-4">
                No experiences yet. Add your first one!
              </p>
              <button
                onClick={() => router.push('/admin/experience/new')}
                className="btn-primary"
              >
                Add Experience
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {exp.position}
                          </h3>
                          <p className="text-primary font-medium">
                            {exp.company}
                          </p>
                        </div>
                        {exp.current && (
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mt-2">
                        {exp.startDate} -{' '}
                        {exp.endDate || 'Present'}
                      </p>
                      <ul className="list-disc list-inside mt-3 text-sm text-foreground space-y-1">
                        {exp.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() =>
                          router.push(`/admin/experience/${exp.id}/edit`)
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-smooth"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteExperience(exp.id)}
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
