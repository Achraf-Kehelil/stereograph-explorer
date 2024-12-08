import { create } from 'zustand';
import { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const demoAccounts: Record<string, { password: string; user: User }> = {
  'directeur.mj': {
    password: 'Dir2024@mj',
    user: {
      id: '1',
      name: 'Kamel Ben Salah',
      role: 'directeur',
      lastActive: new Date().toISOString(),
    },
  },
  'superviseur.mj': {
    password: 'Sup2024@mj',
    user: {
      id: '2',
      name: 'Mehdi Trabelsi',
      role: 'superviseur',
      lastActive: new Date().toISOString(),
    },
  },
  'agent.mj': {
    password: 'Agent2024@mj',
    user: {
      id: '3',
      name: 'Sami Gharbi',
      role: 'agent007',
      lastActive: new Date().toISOString(),
    },
  },
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: async (username: string, password: string) => {
    const account = demoAccounts[username];
    if (account && account.password === password) {
      set({ user: { ...account.user, lastActive: new Date().toISOString() } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));

export const getDefaultCredentials = (role: Role) => {
  switch (role) {
    case 'directeur':
      return {
        username: 'directeur.mj',
        password: 'Dir2024@mj',
      };
    case 'superviseur':
      return {
        username: 'superviseur.mj',
        password: 'Sup2024@mj',
      };
    case 'agent007':
      return {
        username: 'agent.mj',
        password: 'Agent2024@mj',
      };
  }
};