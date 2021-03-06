import React, { createContext, useState } from 'react';
import {
  clearLocalStoraage as clearLocalStorage,
  getToken,
  getTokenAndExpiery,
  getUserByToken,
  isLocalStorageTokenValid,
  setTokenAndExpiery,
} from '../auth/token-utils';
import history from '../history';
import { User } from '../models/user.model';
import { unauthorizedApi } from '../shared/utils/http-client';
import { closeConnection, createSocket } from '../shared/utils/socket-client';
import { Socket } from 'socket.io-client';

export interface UserContextProvider {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  socket: Socket | null;
}

export const UserContext = createContext<UserContextProvider>({
  user: null,
  login: () => Promise.resolve(false),
  logout: () => null,
  socket: null,
});

export default function UserProvider(props: any) {
  const [state, setState] = useState<{ user: User | null; socket: Socket | null }>(() => {
    if (!isLocalStorageTokenValid()) {
      return { user: null, socket: null };
    }

    return { user: getUserByToken(getTokenAndExpiery().token!), socket: createSocket(getToken()) };
  });

  const logout = () => {
    clearLocalStorage();
    if (state.socket) {
      closeConnection(state.socket);
    }
    setState({ user: null, socket: null });
    history.push('/login');
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const tokenResponse = await unauthorizedApi.post('/auth/login', { email, password });
      const user = await getUserByToken(tokenResponse.data);
      setState({ user, socket: createSocket(tokenResponse.data) });
      setTokenAndExpiery(tokenResponse.data);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ login, logout, user: state.user, socket: state.socket }}>
      {props.children}
    </UserContext.Provider>
  );
}
