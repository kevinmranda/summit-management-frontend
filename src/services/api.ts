import axios from 'axios';
import type { User, Summit, Payment } from '../types/User';
import type { LoginResponse, RegisterResponse, IDCardResponse, ScanMealResponse } from '../types/api';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://192.168.0.233:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the Authorization token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
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

// Profile
export const getProfile = () => api.get<User>('/user/profile');

// Summit
export const getSummit = (year: string = '2025') => api.get<Summit>(`/summit/${year}`);
export const createSummit = (formData: FormData) =>
  api.post('/admin/summit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Users
export const getUsers = () => api.get<User[]>('/admin/users');
export const updateUser = (id: number, data: Partial<User>) =>
  api.put(`/admin/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/admin/users/${id}`);

// Reports
export const getPaymentReport = () => api.get('/admin/reports/payments');
export const getMealReport = (params?: { summit_id?: string; meal_type?: string; date?: string }) =>
  api.get('/admin/reports/meals', { params });
export const getUserReport = () => api.get('/admin/reports/users');

// QR Code Scanning - Updated to use new comprehensive endpoint
export const scanQRCode = (qrData: string, location?: string) =>
  api.post('/qr/scan', { qr_data: qrData, location });

// Legacy QR scanning for simple user lookup
export const getUserByQR = (id: string) => api.get<User>(`/qr/user/${id}`);

// ID Card
export const generateIDCard = async (): Promise<{ data: IDCardResponse }> => {
  const response = await api.post<IDCardResponse>('/idcard');
  return { data: response.data };
};

export const getIDCard = async (id: number): Promise<{ data: IDCardResponse }> => {
  const response = await api.get<IDCardResponse>(`/idcard/${id}`);
  return { data: response.data };
};

// Payment Processing
export const initiatePayment = (data: {
  summit_id: number;
  amount: number;
  msisdn: string;
  provider: string;
}) => api.post('/payments/initiate', data);

export const getPaymentProviders = () => api.get('/payments/providers');

// Meal Scanning - Updated to use new QR scanning system
export const scanMeal = async (
  data: { user_id: number; summit_id?: number; location?: string }
): Promise<{ data: ScanMealResponse }> => {
  const response = await api.post<ScanMealResponse>('/meals/scan', data);
  return { data: response.data };
};

export default api;
