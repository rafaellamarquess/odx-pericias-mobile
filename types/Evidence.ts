import { IVitima } from "./Vitima";
import { ICase } from "./Case";

export interface IEvidence {
  _id: string;
  caso: string | ICase;
  vitima?: IVitima | undefined;
  tipo: "imagem" | "texto";
  categoria: string;
  dataUpload: string | Date | null;
  coletadoPor: string; 
  texto?: string | null;
  imagem?: string | null;
}

export interface EvidenceResponse {
  msg: string;
  evidence: IEvidence;
  vitima: IVitima;
}

export interface EvidenceListResponse {
  msg?: string;
  evidencias: IEvidence[];
  paginacao: {
    total: number;
    paginaAtual: number;
    porPagina: number;
    totalPaginas: number;
  };
}