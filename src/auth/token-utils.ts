import { decode } from 'jsonwebtoken';
import moment from 'moment';
import { User } from '../models/user.model';

export const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

export const getTokenAndExpiery = (): { token: string | null; expiryDate: string | null } => ({
  token: localStorage.getItem('token'),
  expiryDate: localStorage.getItem('expireDate'),
});

export const setTokenAndExpiery = (token: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expireDate', moment().add(20, 'h').toISOString());
};

export const clearLocalStoraage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expireDate');
};

export const isTokenValid = (token: string | null, expireDate: string | null): boolean =>
  !!(token && expireDate && Date.now() < new Date(expireDate).getTime());

export const isLocalStorageTokenValid = (): boolean => {
  const { expiryDate, token } = getTokenAndExpiery();
  return isTokenValid(token, expiryDate);
};

export const getUserByToken = (token: string): User => decode(token, { json: true }) as User;
