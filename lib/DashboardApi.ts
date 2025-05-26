import api from './axiosConfig';
import { DashboardData } from '@/Types/Dashboards';

interface FilterParams {
  mes?: string;
  data?: string;
}

export const fetchDashboardData = async (filters: FilterParams = {}): Promise<DashboardData> => {
  const params = new URLSearchParams();
  
  if (filters.mes) params.append('mes', filters.mes);
  if (filters.data) params.append('data', filters.data);

  const response = await api.get<DashboardData>('api/dashboard');
  return response.data;
};