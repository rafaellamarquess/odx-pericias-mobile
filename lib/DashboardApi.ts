// src/lib/DashboardApi.ts
import { DashboardData } from '@/Types/Dashboards';

interface Filters {
  mes?: string;
  data?: string;
}

export const fetchDashboardData = async (filters: Filters): Promise<DashboardData> => {
  const queryParams = new URLSearchParams();
  if (filters.mes) queryParams.append('mes', filters.mes);
  if (filters.data) queryParams.append('data', filters.data);

  console.log("Enviando requisição com filtros:", queryParams.toString());

  const response = await fetch(`/dashboard?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar dados do dashboard');
  }

  const data = await response.json();
  console.log("Dados recebidos:", data);
  return data;
};