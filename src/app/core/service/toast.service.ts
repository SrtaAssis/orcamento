import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(title:string, msg:string) {
    this.messageService.add({ severity: 'success', summary: title, detail: msg });
  }

  showInfo(title:string, msg:string) {
      this.messageService.add({ severity: 'info', summary: title, detail: msg });
  }

  showWarn(title:string, msg:string) {
      this.messageService.add({ severity: 'warn', summary: title, detail: msg });
  }

  showError(err:any) {
    const message: string = err.error && err.error.descricaoErro ? `${err.error.descricaoErro}.` : 'Ocorreram erros ao realizar a operação. Por favor, tente novamente.';
    this.messageService.add({ severity: 'error', summary: "Erro", detail: message });
  }
}
