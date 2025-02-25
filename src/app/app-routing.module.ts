import { NgModule,} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPessoasComponent } from './pages/listar-pessoas/listar-pessoas.component';
import { CadastrarEditarPessoaComponent } from './pages/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component';

const routes: Routes = [
  { path: 'listar-pessoas', component: ListarPessoasComponent },
  { path: 'cadastrar-pessoa', component: CadastrarEditarPessoaComponent},
  { path: 'editar-pessoa/:id', component: CadastrarEditarPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
