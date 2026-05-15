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

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools';
  level: number;
  icon?: string;
}

export default function AdminSkillsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    if (!user) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'skills'));
      const skillList: Skill[] = [];
      querySnapshot.forEach((doc) => {
        skillList.push({ id: doc.id, ...doc.data() } as Skill);
      });
      setSkills(skillList);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    fetchSkills();
  }, [user, router]);

  const deleteSkill = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'skills', id));
      setSkills(skills.filter((s) => s.id !== id));
      toast.success('Skill deleted');
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  const categories = ['Frontend', 'Backend', 'Databases', 'Tools'];

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 lg:ml-0">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Skills</h1>
              <p className="text-muted-foreground mt-2">
                Manage your technical skills
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/skills/new')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Skill
            </button>
          </div>

          {/* Skills by Category */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-muted-foreground">Loading skills...</div>
            </div>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => {
                const categorySkills = skills.filter(
                  (s) => s.category === category
                );

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      {category}
                    </h2>

                    {categorySkills.length === 0 ? (
                      <div className="text-muted-foreground p-4 bg-card rounded-lg border border-border">
                        No skills in this category yet
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-smooth"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">
                                {skill.name}
                              </h3>
                              <div className="mt-2 w-full bg-muted rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {skill.level}%
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={() =>
                                  router.push(`/admin/skills/${skill.id}/edit`)
                                }
                                className="p-2 rounded-lg hover:bg-muted transition-smooth"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => deleteSkill(skill.id)}
                                className="p-2 rounded-lg hover:bg-destructive/10 transition-smooth text-destructive"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
