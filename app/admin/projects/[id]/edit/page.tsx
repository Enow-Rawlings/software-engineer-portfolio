'use client';

import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

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

export default function EditProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() } as Project);
        } else {
          setProject(null);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast.error('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user, router, projectId]);

  const handleSubmit = async (updatedProject: Project) => {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        title: updatedProject.title,
        description: updatedProject.description,
        image: updatedProject.image,
        technologies: updatedProject.technologies,
        github: updatedProject.github,
        demo: updatedProject.demo,
        visible: updatedProject.visible,
        updatedAt: serverTimestamp(),
      });
      toast.success('Project updated successfully');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading project...</div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex gap-4 min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-destructive">Project not found</div>
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
            <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
            <p className="text-muted-foreground mt-2">
              Update your project details
            </p>
          </div>
          <ProjectForm
            project={project}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>
      </main>
    </div>
  );
}
