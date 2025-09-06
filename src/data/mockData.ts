import { Project, Task } from '@/types/project';

// Mock tasks for demo purposes
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'User Authentication System',
    description: 'As a user, I want to be able to sign up and log in securely so that I can access my personalized dashboard.',
    status: 'todo',
    priority: 'high',
    outcome: 'Secure authentication system implemented with OAuth support',
    reporter: 'John Doe',
    comments: [
      {
        id: '1',
        content: 'This should include OAuth integration with Google and GitHub.',
        author: 'Tech Lead',
        createdAt: new Date('2024-01-15'),
      }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    storyPoints: 8,
  },
  {
    id: '2',
    title: 'Dashboard Analytics Widget',
    description: 'Create an interactive analytics dashboard that shows user engagement metrics and performance data.',
    status: 'progress',
    priority: 'medium',
    outcome: 'Interactive dashboard with responsive charts and real-time metrics',
    reporter: 'Sarah Johnson',
    comments: [
      {
        id: '2',
        content: 'Working on the chart integration with React Charts library.',
        author: 'Mike Chen',
        createdAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        content: 'Please make sure to include responsive design for mobile devices.',
        author: 'UI Designer',
        createdAt: new Date('2024-01-21'),
      }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-21'),
    storyPoints: 5,
  },
  {
    id: '3',
    title: 'API Documentation',
    description: 'Document all REST API endpoints with examples and proper authentication headers.',
    status: 'review',
    priority: 'low',
    outcome: 'Complete API documentation with examples and authentication details',
    reporter: 'Tech Lead',
    comments: [],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22'),
    storyPoints: 3,
  },
  {
    id: '4',
    title: 'Mobile App Setup',
    description: 'Set up the initial React Native project structure with navigation and basic components.',
    status: 'done',
    priority: 'urgent',
    outcome: 'React Native project structure with navigation and basic components completed',
    reporter: 'Product Manager',
    comments: [
      {
        id: '4',
        content: 'Project setup completed successfully! Ready for feature development.',
        author: 'Alex Rodriguez',
        createdAt: new Date('2024-01-18'),
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    storyPoints: 13,
  },
  {
    id: '5',
    title: 'Payment Integration',
    description: 'Integrate Stripe payment system for subscription management and one-time purchases.',
    status: 'todo',
    priority: 'high',
    reporter: 'Product Manager',
    comments: [],
    outcome: 'Stripe integration for subscriptions and one-time payments',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    storyPoints: 8,
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Task Management Platform',
    key: 'TMP',
    description: 'A comprehensive task management and project tracking platform for teams.',
    tasks: mockTasks,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'E-commerce Website',
    key: 'ECW',
    description: 'Modern e-commerce platform with advanced analytics and user management.',
    tasks: [],
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    key: 'MBA',
    description: 'Secure mobile banking application with biometric authentication.',
    tasks: [],
    createdAt: new Date('2024-01-03'),
  },
];