import * as repo from './idea.repository';

export const createIdeaService = async (
  userId: number,
  data: {
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'idea' | 'in-progress' | 'completed' | 'archived';
    tags?: string[];
  },
) => {
  if (!data.title || !data.description) throw new Error('Title and description are required');
  return await repo.createIdea({ userId, ...data });
};

export const getUserIdeasService = async (userId: number) => {
  return await repo.findIdeasByUser(userId);
};

export const getIdeaByIdService = async (id: number) => {
  const idea = await repo.findIdeaById(id);
  if (!idea) throw new Error('Idea not found');
  return idea;
};

export const updateIdeaService = async (
  id: number,
  data: Partial<{
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'idea' | 'in-progress' | 'completed' | 'archived';
    tags: string[];
  }>,
) => {
  const updated = await repo.updateIdea(id, data);
  if (!updated) throw new Error('Idea not found');
  return updated;
};

export const deleteIdeaService = async (id: number) => {
  await repo.deleteIdea(id);
};
