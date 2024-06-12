import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrcamentoDados } from '../model/orcamento';
import { ParentService } from './parent.service';

@Injectable({
  providedIn: 'root'
})
export class SinapService extends ParentService{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }


  salvar(value:OrcamentoDados) {
    const data = {
      type: 'POST',
      table: 'sinap',
      values:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }

  getSinap() {
    const data = {
      type: 'GET',
      table: 'sinap',
      header: false
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }

  deletar() {
    const data = {
      type: 'DELETE',
      table: 'sinap',
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }
}
