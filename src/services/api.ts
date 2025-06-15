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
  api.post<LoginResponse>('/login', { email, password });

export const register = (data: {
  full_name: string;
  email: string;
  password: string;
  university: string;
  conference: string;
  zone: string;
  branch: string;
}) => api.post<RegisterResponse>('/register', data);

export const getProfile = () => api.get<User>('/user/profile');
// export const getSummit = (year: string) => api.get<Summit>(`/summit/${year}`);
export const getSummit = () => api.get<Summit>(`/summit/2026`);
// export const generateIDCard = () => api.post<IDCardResponse>('/idcard');
export const getUsers = () => api.get<User[]>('/admin/users');
export const updateUser = (id: number, data: Partial<User>) =>
  api.put(`/admin/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/admin/users/${id}`);
export const createSummit = (data: { year: string; name: string; date: string }) =>
  api.post('/admin/summit', data);
export const getPaymentReport = () => api.get<Payment[]>('/admin/reports/payments');
export const scanQRCode = (id: string) => api.get<User>(`/admin/qr/scan/${id}`);

export const generateIDCard = async (): Promise<{ data: IDCardResponse }> => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/idcard', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data };
};

export const getIDCard = async (id: number): Promise<{ data: IDCardResponse }> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/idcard/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { data: response.data };
};

export default api;