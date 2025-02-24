import { ContatoService } from './../../services/contato.service';
import { PessoaService } from './../../services/pessoa.service';
import { Component } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/ipessoa';

@Component({
  selector: 'app-listar-pessoas',
  templateUrl: './listar-pessoas.component.html',
  styleUrls: ['./listar-pessoas.component.scss']
})
export class ListarPessoasComponent {
  pessoas: IPessoa[] = [];

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.pessoaService.buscarTodasPessoas().subscribe({
      next: (response: IPessoa[]) => {
        this.pessoas = response;
      },
      error: (error) => {
        console.error(error.message);
      }
    })
  }
}
