'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

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

export default function EditExperiencePage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const experienceId = params.id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const fetchExperience = async () => {
      try {
        const docRef = doc(db, 'experiences', experienceId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExperience({ id: docSnap.id, ...docSnap.data() } as Experience);
        } else {
          setExperience(null);
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
        toast.error('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [user, router, experienceId]);

  const handleSubmit = async (updatedExperience: Experience) => {
    try {
      await updateDoc(doc(db, 'experiences', experienceId), {
        company: updatedExperience.company,
        position: updatedExperience.position,
        duration: updatedExperience.duration,
        description: updatedExperience.description,
        startDate: updatedExperience.startDate,
        endDate: updatedExperience.endDate,
        current: updatedExperience.current,
        updatedAt: serverTimestamp(),
      });
      toast.success('Experience updated successfully');
      router.push('/admin/experience');
    } catch (error) {
      console.error('Error updating experience:', error);
      toast.error('Failed to update experience');
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading experience...</div>
        </main>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-destructive">Experience not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Edit Experience</h1>
            <p className="text-muted-foreground mt-2">
              Update your experience details
            </p>
          </div>
          <ExperienceForm
            experience={experience}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
