import { useState } from 'react';
import { Task, priorityConfig, Comment } from '@/types/project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { TaskDialog } from './TaskDialog';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onTaskUpdate: (task: Task) => void;
}

export const TaskCard = ({ task, onStatusChange, onTaskUpdate }: TaskCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const priority = priorityConfig[task.priority];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Card 
        className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 bg-card border-border"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-sm text-card-foreground leading-tight">
                {task.title}
              </h4>
            </div>
            <Badge 
              variant="secondary" 
              className={`ml-2 text-xs bg-${priority.color}-light text-${priority.color} border-${priority.color}/20`}
            >
              {priority.icon} {priority.label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
          
          {task.outcome && (
            <div className="mb-3 p-2 bg-muted rounded text-xs">
              <span className="font-medium">Outcome: </span>
              <span className="text-muted-foreground">{task.outcome}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {task.assignee && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {getInitials(task.assignee)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {task.comments.length > 0 && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{task.comments.length}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDialog
        task={task}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStatusChange={onStatusChange}
        onTaskUpdate={onTaskUpdate}
      />
    </>
  );
};