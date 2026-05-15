'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SkillForm } from '@/components/admin/SkillForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools';
  level: number;
  icon?: string;
}

export default function NewSkillPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const handleSubmit = async (skill: Skill) => {
    try {
      await addDoc(collection(db, 'skills'), {
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon: skill.icon || '',
        createdAt: serverTimestamp(),
      });
      toast.success('Skill added successfully');
      router.push('/admin/skills');
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Add New Skill</h1>
            <p className="text-muted-foreground mt-2">
              Add a new technical skill to your portfolio
            </p>
          </div>
          <SkillForm onSubmit={handleSubmit} onCancel={() => router.back()} />
        </div>
      </main>
    </div>
  );
}
