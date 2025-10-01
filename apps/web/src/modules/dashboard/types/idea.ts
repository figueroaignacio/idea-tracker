export interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'idea' | 'in-progress' | 'completed' | 'archived';
  createdAt: Date;
  tags: string[];
}
