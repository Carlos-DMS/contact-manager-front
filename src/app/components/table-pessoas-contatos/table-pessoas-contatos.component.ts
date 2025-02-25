import { Component, Input } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-table-pessoas-contatos',
  templateUrl: './table-pessoas-contatos.component.html',
  styleUrls: ['./table-pessoas-contatos.component.scss'],
})
export class TablePessoasContatosComponent {
  @Input()
  pessoas: IPessoa[] = [];

  constructor(private readonly contatoService: ContatoService) {}

  formatarCep(cep: string | undefined) {
    if (cep) {
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return null;
  }

  buscarContatosPorIDPessoa(pessoa: IPessoa, idPessoa: number) {
    if (!pessoa.contatosCarregados) {
      this.contatoService.buscarTodosContatosPorPessoaID(idPessoa).subscribe({
        next: (response: IContato[]) => {
          pessoa.contatos = response;
          pessoa.contatosCarregados = true;
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
