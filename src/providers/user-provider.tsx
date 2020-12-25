import React, { createContext, useState } from 'react';
import {
  clearLocalStoraage as clearLocalStorage,
  getTokenAndExpiery,
  getUserByToken,
  isLocalStorageTokenValid,
  setTokenAndExpiery,
} from '../auth/token-utils';
import history from '../history';
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
  const [state, setState] = useState<{ user: User | null }>(() => {
    if (!isLocalStorageTokenValid()) {
      return { user: null };
    }

    return { user: getUserByToken(getTokenAndExpiery().token!) };
  });

  const logout = () => {
    clearLocalStorage();
    setState({ user: null });
    history.push('/login');
  };
  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const tokenReponse = await unauthorizedApi.post('/auth/login', { email, password });
      const user = await getUserByToken(tokenReponse.data);
      setState({ user });
      setTokenAndExpiery(tokenReponse.data);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ login, logout, user: state.user }}>
      {props.children}
    </UserContext.Provider>
  );
}
