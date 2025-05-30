// src/Types/Dashboards.ts
type FiltroKey = 'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade';

interface DadosItem {
  categoria: string;
  quantidade: number;
  tipoGrafico?: string;
}

interface DashboardData {
  totalCasos: number;
  casosPorMes: { mes: string; quantidade: number }[];
  vitima?: DadosItem[];
  sexo?: DadosItem[];
  estado?: DadosItem[];
  lesoes?: DadosItem[];
  cidade?: DadosItem[];
}

export const chartConfig = {
  backgroundGradientFrom: "#f3f4f6",
  backgroundGradientTo: "#f3f4f6",
  color: (opacity = 1) => `rgba(26, 85, 120, ${opacity})`,  
  labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,  
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 14,
    fontWeight: 'bold',
  },
};
export type { FiltroKey, DadosItem, DashboardData };