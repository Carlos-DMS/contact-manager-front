import { IPessoa } from 'src/app/interfaces/ipessoa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  url = environment.url;

  constructor(private readonly http: HttpClient) { }

  buscarTodasPessoas() {
    return this.http.get<IPessoa[]>(`${this.url}/pessoas`)
  }

  buscarPessoaPorID(id: number) {
    return this.http.get<IPessoa>(`${this.url}/pessoas/${id}`)
  }

  cadastrarPessoa(pessoa: IPessoa) {
    return this.http.post<void>(`${this.url}/pessoas`, pessoa)
  }

  editarPessoaPorID(id: number, pessoa: IPessoa) {
    return this.http.put<void>(`${this.url}/pessoas/${id}`, pessoa)
  }

  deletarPessoaPorID(id: number) {
    return this.http.delete<void>(`${this.url}/pessoas/${id}`)
  }
}
