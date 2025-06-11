import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DashboardData } from '../types/Dashboard';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.error('Erro no interceptor de requisição:', err);
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      console.warn('Erro 401: Token inválido. Limpando AsyncStorage.');
      await AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(err);
  }
);

interface FilterParams {
  ano?: string;
  mes?: string;
}

export const fetchDashboardData = async (filters: FilterParams = {}): Promise<DashboardData> => {
  const params = new URLSearchParams();
  if (filters.ano) params.append('ano', filters.ano);
  if (filters.mes) params.append('mes', filters.mes);
  const { data } = await api.get('/api/dashboard', { params });
  return data;
};

export default api;