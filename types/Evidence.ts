// types/Evidence.ts
export interface Evidence {
    _id: string;
    casoReferencia: string;
    tipo: 'imagem' | 'texto';
    categoria: string;
    coletadoPor: string;
    texto?: string;
    imagem?: string;
    vitimaId?: string;
  }

  export interface EvidenceListResponse {
    evidencias: Evidence[];
    total: number;
  }