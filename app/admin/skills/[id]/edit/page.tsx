'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SkillForm } from '@/components/admin/SkillForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools';
  level: number;
  icon?: string;
}

export default function EditSkillPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const skillId = params.id as string;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const fetchSkill = async () => {
      try {
        const docRef = doc(db, 'skills', skillId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSkill({ id: docSnap.id, ...docSnap.data() } as Skill);
        } else {
          setSkill(null);
        }
      } catch (error) {
        console.error('Error fetching skill:', error);
        toast.error('Failed to load skill');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [user, router, skillId]);

  const handleSubmit = async (updatedSkill: Skill) => {
    try {
      await updateDoc(doc(db, 'skills', skillId), {
        name: updatedSkill.name,
        category: updatedSkill.category,
        level: updatedSkill.level,
        icon: updatedSkill.icon || '',
        updatedAt: serverTimestamp(),
      });
      toast.success('Skill updated successfully');
      router.push('/admin/skills');
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill');
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading skill...</div>
        </main>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-destructive">Skill not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Edit Skill</h1>
            <p className="text-muted-foreground mt-2">
              Update your skill details
            </p>
          </div>
          <SkillForm
            skill={skill}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
