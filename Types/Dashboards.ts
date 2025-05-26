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

export type { FiltroKey, DadosItem, DashboardData };