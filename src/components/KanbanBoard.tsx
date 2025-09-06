import { useState } from 'react';
import { Task, TaskStatus, statusConfig } from '@/types/project';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddTaskDialog } from './AddTaskDialog';

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onTaskUpdate: (task: Task) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const KanbanBoard = ({ tasks, onStatusChange, onTaskUpdate, onAddTask }: KanbanBoardProps) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const statusTasks = getTasksByStatus(status as TaskStatus);
          
          return (
            <div key={status} className="space-y-4">
              <div className={`bg-${config.color} rounded-lg p-4 border border-border/50`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{config.icon}</span>
                    <h3 className="font-semibold text-foreground">
                      {config.label}
                    </h3>
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                      {statusTasks.length}
                    </span>
                  </div>
                  
                  {status === 'todo' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsAddTaskOpen(true)}
                      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3 min-h-32">
                  {statusTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={onStatusChange}
                      onTaskUpdate={onTaskUpdate}
                    />
                  ))}
                  
                  {statusTasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No tasks yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddTaskDialog
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  );
};