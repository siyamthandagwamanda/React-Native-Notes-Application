// What a user looks like when saved.
export type User = {
  id: string;
  username: string;
  email: string;
  password: string; 
};

// What a note looks like when saved.
export type Note = {
  id: string;
  userId: string;     
  title: string;     
  text: string;
  category: string;   
  createdAt: string;  
  updatedAt?: string;
  pinned?: boolean;   
  color?: string;     
  font?: string;      
  date?: string;      
};