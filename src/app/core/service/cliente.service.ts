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
    
      value:value
    };
    const headers = new HttpHeaders({
    "Content-Type": "text/plain;charset=utf-8",
    "Host": "script.google.com",});
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,JSON.stringify(data),headers);
  }

  getCliente() {
    const data = {
      type: 'GET',
      table: 'cliente',
      header: true
    };
    const url = `${environment.planilhaBancoDeDados}`;
    const headers = new HttpHeaders({'Content-Type':'text/plain;charset=utf-8'});
    return super.post(url,data,headers);

  }
  
}
