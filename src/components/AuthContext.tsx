import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../types/types';

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {} });

// Wraps the app so any screen can read or change the logged-in user.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);