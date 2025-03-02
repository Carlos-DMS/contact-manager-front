import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  mostrarErros(error: any) {
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
