import { PessoaService } from './../../services/pessoa.service';
import { Component, Input } from '@angular/core';
import { IContato } from 'src/app/interfaces/icontato';
import { IPessoa } from 'src/app/interfaces/ipessoa';
import { ContatoService } from 'src/app/services/contato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-pessoas-contatos',
  templateUrl: './table-pessoas-contatos.component.html',
  styleUrls: ['./table-pessoas-contatos.component.scss'],
})
export class TablePessoasContatosComponent {
  @Input()
  pessoas: IPessoa[] = [];

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly contatoService: ContatoService
  ) {}

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

  deletarPessoa(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#808080',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.deletarPessoaPorID(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Excluído!',
              confirmButtonColor: '#3085d6',
              text: 'Pessoa excluída com sucesso!',
              icon: 'success'
            });

            this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== id);
          },
          error: (error) => {
            Swal.fire({
              title: 'Erro!',
              text: error.error || 'Falha ao excluir o registro.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }
}
