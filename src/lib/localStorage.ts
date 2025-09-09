import { Project } from '@/types/project';

const PROJECTS_KEY = 'projectflow_projects';
const CURRENT_PROJECT_KEY = 'projectflow_current_project';

export const localStorage_utils = {
  // Save projects to localStorage
  saveProjects: (projects: Project[]): void => {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  },

  // Load projects from localStorage
  loadProjects: (): Project[] => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      if (!stored) return [];
      
      const projects = JSON.parse(stored);
      // Convert date strings back to Date objects
      return projects.map((project: any) => ({
        ...project,
        createdAt: new Date(project.createdAt),
        tasks: project.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          comments: task.comments?.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt),
          })) || [],
        })),
      }));
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error);
      return [];
    }
  },

  // Save current project ID
  saveCurrentProjectId: (projectId: string | null): void => {
    try {
      if (projectId) {
        localStorage.setItem(CURRENT_PROJECT_KEY, projectId);
      } else {
        localStorage.removeItem(CURRENT_PROJECT_KEY);
      }
    } catch (error) {
      console.error('Failed to save current project ID:', error);
    }
  },

  // Load current project ID
  loadCurrentProjectId: (): string | null => {
    try {
      return localStorage.getItem(CURRENT_PROJECT_KEY);
    } catch (error) {
      console.error('Failed to load current project ID:', error);
      return null;
    }
  },

  // Clear all data
  clearAll: (): void => {
    try {
      localStorage.removeItem(PROJECTS_KEY);
      localStorage.removeItem(CURRENT_PROJECT_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};