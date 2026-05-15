'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

export default function AdminProjectsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectList: Project[] = [];
      querySnapshot.forEach((doc) => {
        projectList.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectList);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    fetchProjects();
  }, [user, router]);

  const toggleVisibility = async (id: string) => {
    try {
      const project = projects.find((p) => p.id === id);
      if (!project) return;

      await updateDoc(doc(db, 'projects', id), {
        visible: !project.visible,
      });

      setProjects(projects.map((p) =>
        p.id === id ? { ...p, visible: !p.visible } : p
      ));
      toast.success('Project visibility updated');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(projects.filter((p) => p.id !== id));
      toast.success('Project deleted');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
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
              <h1 className="text-3xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-2">
                Manage your portfolio projects
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-muted-foreground">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 rounded-lg bg-card border border-border"
            >
              <p className="text-muted-foreground mb-4">
                No projects yet. Create your first one!
              </p>
              <button
                onClick={() => router.push('/admin/projects/new')}
                className="btn-primary"
              >
                Create Project
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleVisibility(project.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-smooth"
                        title={
                          project.visible
                            ? 'Hide project'
                            : 'Show project'
                        }
                      >
                        {project.visible ? (
                          <Eye size={18} className="text-primary" />
                        ) : (
                          <EyeOff size={18} className="text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/projects/${project.id}/edit`)
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-smooth"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
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
