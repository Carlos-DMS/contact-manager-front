import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListarPessoasComponent } from './pages/listar-pessoas/listar-pessoas.component';
import { TablePessoasContatosComponent } from './components/table-pessoas-contatos/table-pessoas-contatos.component';
import { CadastrarEditarPessoaComponent } from './pages/cadastrar-editar-pessoa/cadastrar-editar-pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarEditarContatoComponent } from './pages/cadastrar-editar-contato/cadastrar-editar-contato.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListarPessoasComponent,
    TablePessoasContatosComponent,
    CadastrarEditarPessoaComponent,
    CadastrarEditarContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
