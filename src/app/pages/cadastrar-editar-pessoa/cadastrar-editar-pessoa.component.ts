import { IPessoa } from 'src/app/interfaces/ipessoa';
import { PessoaService } from './../../services/pessoa.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id === undefined) {
      console.error('ID não definido. Não é possível buscar a pessoa.');
      return;
    }

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
      next: () => this.router.navigate(['/listar-pessoas']),
      error: (error) => console.error(error.message),
    });
  }

  editarPessoa() {
    if (!this.id) return;

    const pessoa = this.sanitizarDadosFormulario();

    console.log(pessoa);

    this.pessoaService.editarPessoaPorID(this.id, pessoa).subscribe({
      next: () => this.router.navigate(['/listar-pessoas']),
      error: (error) => console.error(error.message),
    });
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
