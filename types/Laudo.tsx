import { IVitima } from './Vitima';
import { IEvidence } from './Evidence';
import { IUser } from './User';
import { ICase } from './Case';

export interface ILaudo {
  _id?: string;
  evidencias: Array<string | IEvidence>;
  vitima: string | IVitima;
  caso: string | ICase;
  perito: string | IUser;
  dadosAntemortem: string;
  dadosPostmortem: string;
  analiseLesoes: string;
  conclusao: string;
  dataCriacao: string | Date;
  assinaturaDigital?: string | null;
}

export interface LaudoResponse {
  msg: string;
  laudo: ILaudo;
  pdf: string;
}