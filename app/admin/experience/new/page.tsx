'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

export default function NewExperiencePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const handleSubmit = async (experience: Experience) => {
    try {
      await addDoc(collection(db, 'experiences'), {
        company: experience.company,
        position: experience.position,
        duration: experience.duration,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate,
        current: experience.current,
        createdAt: serverTimestamp(),
      });
      toast.success('Experience added successfully');
      router.push('/admin/experience');
    } catch (error) {
      console.error('Error adding experience:', error);
      toast.error('Failed to add experience');
    }
  };

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Add Work Experience</h1>
            <p className="text-muted-foreground mt-2">
              Add a new position to your experience timeline
            </p>
          </div>
          <ExperienceForm onSubmit={handleSubmit} onCancel={() => router.back()} />
        </div>
      </main>
    </div>
  );
}
