import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePessoasContatosComponent } from './table-pessoas-contatos.component';

describe('TablePessoasContatosComponent', () => {
  let component: TablePessoasContatosComponent;
  let fixture: ComponentFixture<TablePessoasContatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePessoasContatosComponent]
    });
    fixture = TestBed.createComponent(TablePessoasContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
