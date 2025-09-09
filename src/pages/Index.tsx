import { useState, useEffect } from 'react';
import { Project, Task, TaskStatus } from '@/types/project';
import { mockProjects } from '@/data/mockData';
import { localStorage_utils } from '@/lib/localStorage';
import { ProjectSelector } from '@/components/ProjectSelector';
import { KanbanBoard } from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, HardDrive } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage_utils.loadProjects();
    
    if (savedProjects.length > 0) {
      setProjects(savedProjects);
      
      // Load the previously selected project
      const savedProjectId = localStorage_utils.loadCurrentProjectId();
      if (savedProjectId) {
        const savedProject = savedProjects.find(p => p.id === savedProjectId);
        setCurrentProject(savedProject || savedProjects[0]);
      } else {
        setCurrentProject(savedProjects[0]);
      }
    } else {
      // Initialize with mock data if no saved data exists
      setProjects(mockProjects);
      setCurrentProject(mockProjects[0]);
      localStorage_utils.saveProjects(mockProjects);
      localStorage_utils.saveCurrentProjectId(mockProjects[0]?.id || null);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage_utils.saveProjects(projects);
    }
  }, [projects]);

  // Save current project ID whenever it changes
  useEffect(() => {
    localStorage_utils.saveCurrentProjectId(currentProject?.id || null);
  }, [currentProject]);

  const handleProjectCreate = (projectData: Omit<Project, 'id' | 'createdAt' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      tasks: [],
      createdAt: new Date(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setCurrentProject(newProject);
    toast.success(`Project "${newProject.name}" created successfully!`);
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

  const handleClearData = () => {
    localStorage_utils.clearAll();
    setProjects(mockProjects);
    setCurrentProject(mockProjects[0]);
    toast.success('All data cleared! Refreshed with demo data.');
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
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
              <HardDrive className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Local Storage
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleClearData}
              className="text-sm"
            >
              Clear Data
            </Button>
          </div>
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