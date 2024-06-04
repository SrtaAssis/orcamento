import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ParentService } from './parent.service';
import { OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService extends ParentService{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }


  salvar(value:OrcamentoModel) {
    const data = {
      type: 'POST',
      table: 'orcamento',
      value:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }

  getOrcamento() {
    const data = {
      type: 'GET',
      table: 'orcamento',
      header: true
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }
}
