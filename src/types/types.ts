export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type Note = {
  id: string;
  userId: string;
  title: string;  
  text: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
};

export const CATEGORIES = ['Work', 'Study', 'Personal'];