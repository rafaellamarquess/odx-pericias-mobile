import { ICase } from "./Case";

export interface IVitima {
  _id: string;
  nome?: string | null;
  dataNascimento?: string | null;
  idadeAproximada?: number | null;
  nacionalidade?: string | null;
  cidade?: string | null;
  sexo: "masculino" | "feminino" | "indeterminado";
  estadoCorpo: "inteiro" | "fragmentado" | "carbonizado" | "putrefacto" | "esqueleto";
  lesoes?: string | null;
  identificada: boolean;
  caso?: string | ICase | null;
}

export interface VitimaListResponse {
  vitimas: IVitima[];
  data: IVitima[];
  msg?: string;
}