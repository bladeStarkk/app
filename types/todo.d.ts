export interface TodoTask {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}
