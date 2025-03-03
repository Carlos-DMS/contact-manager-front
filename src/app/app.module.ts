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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarEditarContatoComponent } from './pages/cadastrar-editar-contato/cadastrar-editar-contato.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ListarPessoasComponent,
    TablePessoasContatosComponent,
    CadastrarEditarPessoaComponent,
    CadastrarEditarContatoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
