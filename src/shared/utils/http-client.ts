import axios, { AxiosInstance } from 'axios';
import { config as appConfig } from '../../config/config';

export const unauthorizedApi: AxiosInstance = axios.create({
  baseURL: appConfig.baseApi,
});

export const apiInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApi,
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token');
    config.headers = {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
