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
      value:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }

  getSinap() {
    const data = {
      type: 'GET',
      table: 'sinap',
      header: true
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }
}
