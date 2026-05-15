'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  visible: boolean;
  createdAt: string;
}

export default function NewProjectPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const handleSubmit = async (project: Project) => {
    try {
      await addDoc(collection(db, 'projects'), {
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        github: project.github,
        demo: project.demo,
        visible: project.visible,
        createdAt: serverTimestamp(),
      });
      toast.success('Project created successfully');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="flex gap-4 min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Create New Project</h1>
            <p className="text-muted-foreground mt-2">
              Add a new project to your portfolio
            </p>
          </div>
          <ProjectForm onSubmit={handleSubmit} onCancel={() => router.back()} />
        </div>
      </main>
    </div>
  );
}
