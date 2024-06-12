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
      values:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }

  getFornecedores() {
    const data = {
      type: 'GET',
      table: 'fornecedor',
      header: false
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }

  delete(id) {
    const data = {
      type: 'DELETE',
      table: 'fornecedor',
      id: id
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }
}
