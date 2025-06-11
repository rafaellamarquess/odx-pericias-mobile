export interface IVitima {
    _id: string;
    nome?: string;
    dataNascimento?: string;
    idadeAproximada?: number;
    nacionalidade?: string;
    cidade?: string;
    sexo: 'masculino' | 'feminino' | 'indeterminado';
    estadoCorpo: 'inteiro' | 'fragmentado' | 'carbonizado' | 'putrefacto' | 'esqueleto';
    lesoes?: string;
    identificada: boolean;
  }
  
  export interface VitimaListResponse {
    data: IVitima[];
  }