import { Component } from '@angular/core';
import { PessoaService } from './../../services/pessoa.service';
import { IPessoa } from '../../interfaces/ipessoa';

@Component({
  selector: 'app-listar-pessoas',
  templateUrl: './listar-pessoas.component.html',
  styleUrls: ['./listar-pessoas.component.scss']
})
export class ListarPessoasComponent {
  pessoas: IPessoa[] = [];
  pessoasFiltradas?: IPessoa[];
  termoBusca = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  private carregarPessoas() {
    this.pessoaService.buscarTodasPessoas().subscribe({
      next: (response: IPessoa[]) => {
        this.pessoas = response;
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  filtrarPessoas() {
    if (!this.termoBusca.trim()) {
      this.pessoasFiltradas = undefined;
      return;
    }

    const termo = this.termoBusca.toLowerCase();
    this.pessoasFiltradas = this.pessoas.filter(pessoa =>
      pessoa.nome.toLowerCase().includes(termo)
    );
  }
}
