import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoaService } from './../../services/pessoa.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IEndereco } from 'src/app/interfaces/iendereco';

@Component({
  selector: 'app-cadastrar-editar-pessoa',
  templateUrl: './cadastrar-editar-pessoa.component.html',
  styleUrls: ['./cadastrar-editar-pessoa.component.scss'],
})
export class CadastrarEditarPessoaComponent {
  id?: number;
  pessoa?: IPessoa;

  formGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    cep: new FormControl(null, [Validators.pattern('^\\d{8}$')]),
    endereco: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(150),
    ]),
    cidade: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    uf: new FormControl(null),
  });

  estadosBrasileiros: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id !== undefined) {
      this.pessoaService.buscarPessoaPorID(this.id).subscribe({
        next: (response: IPessoa) => {
          this.pessoa = response;
          this.carregarDadosEdicao();
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }

  carregarDadosEdicao() {
    if (this.pessoa) {
      this.formGroupPessoa.patchValue({
        nome: this.pessoa.nome,
        cep: this.pessoa.cep,
        endereco: this.pessoa.endereco,
        cidade: this.pessoa.cidade,
        uf: this.pessoa.uf,
      });
    }
  }

  cadastrarPessoa() {
    const pessoa = this.sanitizarDadosFormulario();

    this.pessoaService.cadastrarPessoa(pessoa).subscribe({
      next: () => {
        Swal.fire({
          title: 'Cadastrado!',
          text: 'Pessoa cadastrada com sucesso!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/listar-pessoas']);
          }
        });
      },
      error: (error) => this.mostrarErros(error)
    });
  }

  editarPessoa() {
    if (!this.id) {
      return;
    }

    const pessoa = this.sanitizarDadosFormulario();

    Swal.fire({
      title: 'Salvar alterações?',
      text: "Você deseja salvar as modificações feitas?",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Salvar',
      denyButtonText: 'Descartar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaService.editarPessoaPorID(this.id!, pessoa).subscribe({
          next: () => {
            Swal.fire({
              title: 'Salvo!',
              text: 'Alterações salvas com sucesso!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then(() => this.router.navigate(['/listar-pessoas']));
          },
          error: (error) => this.mostrarErros(error)
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Alterações descartadas',
          text: 'As mudanças não foram salvas.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => this.router.navigate(['/listar-pessoas']));
      }
    });
  }

  buscarEnderecoViaCEP() {
    const cepControl = this.formGroupPessoa.get('cep');

    if (cepControl?.valid) {
      const cep = cepControl.value;

      const enderecoViaCEP = this.pessoaService.buscarEnderecoViaCEP(cep).subscribe({
        next: (endereco: IEndereco) => {
          if (endereco.erro) {
            cepControl?.setErrors({ invalidCep: true });
            this.erroCEP();
            return;
          }

          this.formGroupPessoa.patchValue({
            endereco: endereco.logradouro || '',
            cidade: endereco.localidade || '',
            uf: endereco.uf || ''
          });
        },
        error: (error) => {
          this.erroCEP();
          return;
        }
      })
    }
  }

  private mostrarErros(error: any) {
    const erros = error.error;
    let mensagensDeErro: string[] = [];

    if (typeof erros === 'string') {
      mensagensDeErro.push(erros);
    }
    else if (typeof erros === 'object' && erros !== null) {
      mensagensDeErro = Object.values(erros);
    }
    else {
      mensagensDeErro.push('Erro ao processar a requisição.');
    }

    Swal.fire({
      title: 'Erro!',
      html: mensagensDeErro.join('<br><br>'),
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  private erroCEP() {
    Swal.fire({
      title: 'Erro!',
      text: 'O CEP informado é inválido.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })


  }

  private sanitizarDadosFormulario(): IPessoa {
    const rawValue = this.formGroupPessoa.getRawValue();

    return {
      ...rawValue,
      nome: rawValue.nome || null,
      cep: rawValue.cep || null,
      endereco: rawValue.endereco || null,
      cidade: rawValue.cidade || null,
      uf: rawValue.uf || null,
    };
  }
}
