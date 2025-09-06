export type TaskStatus = 'todo' | 'progress' | 'review' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  reporter: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  storyPoints?: number;
  outcome?: string;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
}

export const statusConfig = {
  todo: {
    label: 'To Do',
    color: 'kanban-todo',
    icon: '📋'
  },
  progress: {
    label: 'In Progress', 
    color: 'kanban-progress',
    icon: '⚡'
  },
  review: {
    label: 'Review',
    color: 'kanban-review', 
    icon: '👀'
  },
  done: {
    label: 'Done',
    color: 'kanban-done',
    icon: '✅'
  }
} as const;

export const priorityConfig = {
  low: { label: 'Low', color: 'success', icon: '⬇️' },
  medium: { label: 'Medium', color: 'warning', icon: '➡️' },
  high: { label: 'High', color: 'destructive', icon: '⬆️' },
  urgent: { label: 'Urgent', color: 'destructive', icon: '🔥' }
} as const;