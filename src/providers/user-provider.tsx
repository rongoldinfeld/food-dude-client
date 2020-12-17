import React, { createContext, useState } from 'react';
import { User } from '../models/user.model';

export interface UserContextProvider {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextProvider>({
  user: null,
  login: () => null,
  logout: () => null,
});

export default function UserProvider(props: any) {
  const [state, setState] = useState<{ user: User | null }>({ user: null });

  const logout = () => setState({ user: null });
  const login = (user: User) => setState({ user });

  return (
    <UserContext.Provider value={{ login, logout, user: state.user }}>
      {props.children}
    </UserContext.Provider>
  );
}
