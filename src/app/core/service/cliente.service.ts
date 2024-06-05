import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { InfoTable } from '../model/info-table';
import { ParentService } from './parent.service';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ParentService{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }


  salvar(value:Cliente) {
    const data = {
      type: 'POST',
      table: 'cliente',
      values:value
    };

    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));
  }

  getCliente() {
    const data = {
      type: 'GET',
      table: 'cliente',
      header: false
    };

    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data));

  }
  
}
