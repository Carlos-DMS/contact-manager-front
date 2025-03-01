import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarContatoComponent } from './cadastrar-editar-contato.component';

describe('CadastrarEditarContatoComponent', () => {
  let component: CadastrarEditarContatoComponent;
  let fixture: ComponentFixture<CadastrarEditarContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarEditarContatoComponent]
    });
    fixture = TestBed.createComponent(CadastrarEditarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
