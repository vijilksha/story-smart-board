import { useState } from 'react';
import { Task, statusConfig, priorityConfig, Comment } from '@/types/project';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Calendar, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface TaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onTaskUpdate: (task: Task) => void;
}

export const TaskDialog = ({ task, isOpen, onClose, onStatusChange, onTaskUpdate }: TaskDialogProps) => {
  const [newComment, setNewComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      author: 'Current User',
      createdAt: new Date(),
    };

    const updatedTask = {
      ...task,
      comments: [...task.comments, comment],
      updatedAt: new Date(),
    };

    onTaskUpdate(updatedTask);
    setNewComment('');
    toast.success('Comment added successfully');
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    setSelectedStatus(newStatus);
    onStatusChange(task.id, newStatus);
    toast.success(`Task moved to ${statusConfig[newStatus].label}`);
  };

  const priority = priorityConfig[task.priority];
  const status = statusConfig[selectedStatus];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.icon} {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Badge className={`bg-${priority.color}-light text-${priority.color} border-${priority.color}/20`}>
              {priority.icon} {priority.label}
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {task.description}
            </p>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="font-medium flex items-center gap-1">
                <User className="h-4 w-4" />
                Reporter
              </span>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {getInitials(task.reporter)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{task.reporter}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created
              </span>
              <span className="text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Comments ({task.comments.length})</span>
            </div>

            {/* Existing Comments */}
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {task.comments.map((comment) => (
                <div key={comment.id} className="bg-muted p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getInitials(comment.author)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment... (AI spell check will be available after connecting Supabase)"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-20"
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
