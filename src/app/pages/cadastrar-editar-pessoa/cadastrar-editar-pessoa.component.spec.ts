import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarPessoaComponent } from './cadastrar-editar-pessoa.component';

describe('CadastrarEditarPessoaComponent', () => {
  let component: CadastrarEditarPessoaComponent;
  let fixture: ComponentFixture<CadastrarEditarPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarEditarPessoaComponent]
    });
    fixture = TestBed.createComponent(CadastrarEditarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
