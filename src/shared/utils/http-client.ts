import axios, { AxiosInstance } from 'axios';
import { config as appConfig } from '../../config/config';
import history from '../../history';
import { isTokenValid } from '../validators/valid-token';

export const unauthorizedApi: AxiosInstance = axios.create({
  baseURL: appConfig.baseApi,
});

export const apiInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApi,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const expireDate = localStorage.getItem('expireDate');

    if (isTokenValid(token, expireDate)) {
      config.headers = {
        authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
    } else {
      localStorage.removeItem('token');
      localStorage.getItem('expireDate');
      history.push('/login');
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
