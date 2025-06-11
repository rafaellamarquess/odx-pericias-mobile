interface IEvidence {
  _id: string;
  casoReferencia: string;
  tipo: 'imagem' | 'texto';
  categoria: string;
  coletadoPor: string;
  texto?: string;
  imagem?: string;
  vitimaId: string;
  dataUpload: string;
  vitima?: {
    _id: string;
    nome?: string;
    identificada?: boolean;
    sexo?: string;
    estadoCorpo?: string;
  };
}

interface EvidenceListResponse {
  evidencias: IEvidence[];
  paginacao: {
    total: number;
    paginaAtual: number;
    porPagina: number;
    totalPaginas: number;
  };
}

export type { IEvidence, EvidenceListResponse };