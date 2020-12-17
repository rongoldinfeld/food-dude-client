import React, { createContext, useState } from 'react';
import { User } from '../models/user.model';
import { unauthorizedApi } from '../shared/utils/http-client';

export interface UserContextProvider {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

export const UserContext = createContext<UserContextProvider>({
  user: null,
  login: () => Promise.resolve(false),
  logout: () => null,
});

export default function UserProvider(props: any) {
  const [state, setState] = useState<{ user: User | null }>({ user: null });

  const logout = () => setState({ user: null });
  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await unauthorizedApi.post('/auth/login', { email, password });
      console.log('You signed in, response', response);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ login, logout, user: state.user }}>
      {props.children}
    </UserContext.Provider>
  );
}
