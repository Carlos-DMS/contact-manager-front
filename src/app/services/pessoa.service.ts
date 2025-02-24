import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IPessoa } from '../interfaces/ipessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  buscarTodasPessoas() {
    return this.http.get<IPessoa[]>(`${this.url}/pessoas`)
  }
}
