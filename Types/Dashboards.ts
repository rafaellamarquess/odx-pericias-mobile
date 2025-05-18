type FiltroKey = 'vitima' | 'sexo' | 'estado' | 'lesoes' | 'cidade';

interface DadosItem {
  categoria: string;
  quantidade: number;
}

interface DashboardData {
  totalCasos: number;
  vitima?: DadosItem[];
  sexo?: DadosItem[];
  estado?: DadosItem[];
  lesoes?: DadosItem[];
  cidade?: DadosItem[];
}

export type { FiltroKey, DadosItem, DashboardData };