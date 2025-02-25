import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContato } from '../interfaces/icontato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  url = environment.url;

  constructor(private readonly http: HttpClient) { }

  buscarTodosContatosPorPessoaID(idPessoa: number) {
      return this.http.get<IContato[]>(`${this.url}/contatos/pessoa/${idPessoa}`)
  }
}
