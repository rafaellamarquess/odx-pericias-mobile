export interface ICase {
    _id: string;
    titulo: string;
    descricao: string;
    status: "Em andamento" | "Finalizado" | "Arquivado";
    responsavel: string;
    dataCriacao: string;
    casoReferencia: string;
    cidade: string;
    estado: string;
  }
  
  export interface CaseResponse {
    data: ICase;
    msg?: string;
    success?: boolean;
  }
  
  export interface CaseListResponse {
    casos: ICase[]
    msg?: string;
    success?: boolean;
  }
  
  