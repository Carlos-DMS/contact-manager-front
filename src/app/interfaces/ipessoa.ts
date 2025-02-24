import { IContato } from "./icontato"

export interface IPessoa {
  id: number;
  nome: string;
  endereco?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  contatos?: IContato[];
  contatosCarregados?: boolean;
}
