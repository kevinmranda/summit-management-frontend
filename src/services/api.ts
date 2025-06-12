import axios from 'axios';
import type { User, Summit, Payment } from '../types/User';
import type { LoginResponse, RegisterResponse, IDCardResponse } from '../types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://172.20.10.3:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email: string, password: string) =>
  api.post<LoginResponse>('/api/login', { email, password });

export const register = (data: {
  full_name: string;
  email: string;
  password: string;
  university: string;
  conference: string;
  zone: string;
  branch: string;
}) => api.post<RegisterResponse>('/api/register', data);

export const getProfile = () => api.get<User>('/api/user/profile');
export const getSummit = (year: string) => api.get<Summit>(`/api/summit/${year}`);
export const generateIDCard = () => api.post<IDCardResponse>('/api/idcard');
export const getUsers = () => api.get<User[]>('/api/admin/users');
export const updateUser = (id: number, data: Partial<User>) =>
  api.put(`/api/admin/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/api/admin/users/${id}`);
export const createSummit = (data: { year: string; name: string; date: string }) =>
  api.post('/api/admin/summit', data);
export const getPaymentReport = () => api.get<Payment[]>('/api/admin/reports/payments');
export const scanQRCode = (id: string) => api.get<User>(`/api/admin/qr/scan/${id}`);

export default api;