import { Injectable } from '@angular/core';
import { EtapaModel } from '../model/etapa-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ParentService } from './parent.service';

@Injectable({
  providedIn: 'root'
})
export class EtapaService extends ParentService{

  constructor(private httpClient: HttpClient) { 
    super(httpClient)
  }


  salvar(value:EtapaModel) {
    const data = {
      type: 'POST',
      table: 'etapa',
      value:value
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }

  getEtapas() {
    const data = {
      type: 'GET',
      table: 'etapa',
      header: true
    };
    const url = `${environment.planilhaBancoDeDados}`;
    return super.post(url,data);
  }
}
