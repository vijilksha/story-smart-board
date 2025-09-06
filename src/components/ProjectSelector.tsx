import { useState } from 'react';
import { Project } from '@/types/project';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectSelectorProps {
  projects: Project[];
  currentProject: Project | null;
  onProjectChange: (project: Project) => void;
  onProjectCreate: (project: Omit<Project, 'id' | 'createdAt' | 'tasks'>) => void;
}

export const ProjectSelector = ({ 
  projects, 
  currentProject, 
  onProjectChange, 
  onProjectCreate 
}: ProjectSelectorProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim() || !projectKey.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if key already exists
    if (projects.some(p => p.key.toLowerCase() === projectKey.toLowerCase())) {
      toast.error('Project key already exists');
      return;
    }

    const newProject: Omit<Project, 'id' | 'createdAt' | 'tasks'> = {
      name: projectName.trim(),
      key: projectKey.trim().toUpperCase(),
      description: projectDescription.trim(),
    };

    onProjectCreate(newProject);
    
    // Reset form
    setProjectName('');
    setProjectKey('');
    setProjectDescription('');
    setIsCreateDialogOpen(false);
    
    toast.success('Project created successfully');
  };

  const generateKeyFromName = (name: string) => {
    return name
      .trim()
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 10);
  };

  const handleNameChange = (name: string) => {
    setProjectName(name);
    if (!projectKey) {
      setProjectKey(generateKeyFromName(name));
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 p-6 border-b bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span className="font-medium">Project:</span>
        </div>
        
        <Select
          value={currentProject?.id || ''}
          onValueChange={(projectId) => {
            const project = projects.find(p => p.id === projectId);
            if (project) onProjectChange(project);
          }}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                    {project.key}
                  </span>
                  {project.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>

        {currentProject && (
          <div className="ml-auto text-sm text-muted-foreground">
            {currentProject.tasks.length} tasks total
          </div>
        )}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectKey">Project Key *</Label>
              <Input
                id="projectKey"
                value={projectKey}
                onChange={(e) => setProjectKey(e.target.value.toUpperCase())}
                placeholder="MAP"
                className="font-mono"
                maxLength={10}
                required
              />
              <p className="text-xs text-muted-foreground">
                Short identifier for your project (e.g., MAP, PROJ)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Description</Label>
              <Textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Brief description of your project"
                className="min-h-20"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Create Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};