import { NgModule,} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPessoasComponent } from './pages/listar-pessoas/listar-pessoas.component';

const routes: Routes = [
  { path: 'listar-pessoas', component: ListarPessoasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
