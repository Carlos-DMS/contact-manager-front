import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContato } from 'src/app/interfaces/icontato';
import { ContatoService } from 'src/app/services/contato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-editar-contato',
  templateUrl: './cadastrar-editar-contato.component.html',
  styleUrls: ['./cadastrar-editar-contato.component.scss'],
})
export class CadastrarEditarContatoComponent {
  id?: number;
  idPessoa?: number;
  contato?: IContato;

  tiposContato: string[] = [
    'Email',
    'Celular',
    'Whatsapp',
    'Telegram',
    'Skype',
    'Discord',
    'Microsoft_Teams',
    'LinkedIn',
    'GitHub',
  ];

  formGroupContato: FormGroup = new FormGroup({
    tipoContato: new FormControl(null, Validators.required),
    contato: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
  });

  constructor(
    private readonly contatoService: ContatoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.idPessoa = window.history.state.idPessoa;

    if (this.id !== undefined) {
      this.contatoService.buscarContatoPorID(this.id).subscribe({
        next: (response: IContato) => {
          this.contato = response;
          this.carregarDadosEdicao();
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }

  carregarDadosEdicao() {
    if (this.contato) {
      this.formGroupContato.patchValue({
        tipoContato: this.contato.tipoContato,
        contato: this.contato.contato,
      });
    }
  }

  cadastrarContato() {
    const contato = this.sanitizarDadosFormulario();

    contato.idPessoa = this.idPessoa;

    this.contatoService.cadastrarContato(contato).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cadastrado!',
          text: 'Contato cadastrado com sucesso!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listar-pessoas']);
          }
        });
      },
      error: (error) => this.mostrarErros(error),
    });
  }

  editarContato() {
    if (!this.id) {
      return;
    }

    const contato = this.sanitizarDadosFormulario();

    Swal.fire({
      title: 'Salvar alterações?',
      text: 'Você deseja salvar as modificações feitas?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: 'Descartar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contatoService.editarContatoPorID(this.id!, contato).subscribe({
          next: () => {
            Swal.fire({
              title: 'Salvo!',
              text: 'Alterações salvas com sucesso!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(() => this.router.navigate(['/listar-pessoas']));
          },
          error: (error) => this.mostrarErros(error),
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Alterações descartadas',
          text: 'As mudanças não foram salvas.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => this.router.navigate(['/listar-pessoas']));
      }
    });
  }

  private sanitizarDadosFormulario(): IContato {
    const rawValue = this.formGroupContato.getRawValue();

    return {
      ...rawValue,
      nome: rawValue.tipoContato || null,
      cep: rawValue.contato || null,
    };
  }

  private mostrarErros(error: any) {
    const erros = error.error;
    let mensagensDeErro: string[] = [];

    if (typeof erros === 'string') {
      mensagensDeErro.push(erros);
    } else if (typeof erros === 'object' && erros !== null) {
      mensagensDeErro = Object.values(erros);
    } else {
      mensagensDeErro.push('Erro ao processar a requisição.');
    }

    Swal.fire({
      title: 'Erro!',
      html: mensagensDeErro.join('<br><br>'),
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
