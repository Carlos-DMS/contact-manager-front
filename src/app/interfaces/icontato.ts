import { IPessoa } from "./ipessoa";

export interface IContato {
  id: number;
  idPessoa?: number;
  tipoContato: string;
  contato: string;
  pessoa?: IPessoa;
}
