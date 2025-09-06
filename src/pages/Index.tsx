import { useState } from 'react';
import { Project, Task, TaskStatus } from '@/types/project';
import { mockProjects } from '@/data/mockData';
import { ProjectSelector } from '@/components/ProjectSelector';
import { KanbanBoard } from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(mockProjects[0]);

  const handleProjectCreate = (projectData: Omit<Project, 'id' | 'createdAt' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      tasks: [],
      createdAt: new Date(),
    };

    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
  };

  const handleTaskAdd = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentProject) return;

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedProject = {
      ...currentProject,
      tasks: [...currentProject.tasks, newTask],
    };

    setProjects(prev => 
      prev.map(p => p.id === currentProject.id ? updatedProject : p)
    );
    setCurrentProject(updatedProject);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (!currentProject) return;

    const updatedTasks = currentProject.tasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus, updatedAt: new Date() }
        : task
    );

    const updatedProject = {
      ...currentProject,
      tasks: updatedTasks,
    };

    setProjects(prev =>
      prev.map(p => p.id === currentProject.id ? updatedProject : p)
    );
    setCurrentProject(updatedProject);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    if (!currentProject) return;

    const updatedTasks = currentProject.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );

    const updatedProject = {
      ...currentProject,
      tasks: updatedTasks,
    };

    setProjects(prev =>
      prev.map(p => p.id === currentProject.id ? updatedProject : p)
    );
    setCurrentProject(updatedProject);
  };

  const handleAIAssistClick = () => {
    toast.info('AI features will be available after connecting to Supabase. Click the green Supabase button in the top right!');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ProjectFlow</h1>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleAIAssistClick}
            className="flex items-center gap-2 bg-gradient-primary text-white border-none hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            AI Assistant
          </Button>
        </div>
      </header>

      {/* Project Selector */}
      <ProjectSelector
        projects={projects}
        currentProject={currentProject}
        onProjectChange={setCurrentProject}
        onProjectCreate={handleProjectCreate}
      />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]">
        {currentProject ? (
          <div>
            <div className="p-6 border-b bg-card/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {currentProject.name}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {currentProject.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Project Key</div>
                  <span className="font-mono text-lg font-bold text-primary">
                    {currentProject.key}
                  </span>
                </div>
              </div>
            </div>

            <KanbanBoard
              tasks={currentProject.tasks}
              onStatusChange={handleStatusChange}
              onTaskUpdate={handleTaskUpdate}
              onAddTask={handleTaskAdd}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Project Selected
              </h3>
              <p className="text-muted-foreground">
                Select a project from above or create a new one to get started.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;