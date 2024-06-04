import { Injectable } from '@angular/core';
import { ParentService } from './parent.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { InfoTable } from '../model/info-table';
import { OrcamentoDados } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService  extends ParentService {

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  salvar(value:OrcamentoDados) {
    const data = {
      type: 'POST',
      table: 'fornecedor',
      value:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }

  getFornecedores() {
    const data = {
      type: 'GET',
      table: 'fornecedor',
      header: true
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }

}