import { Injectable } from '@angular/core';
import { OrcamentoModel } from '../model/orcamento';
import { TipoOrcamento } from '../enum/tipo-orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoStorageService {


  private _orcamentos:OrcamentoModel[] = [];
  
  constructor() {
   }

  set orcamentos(cl:OrcamentoModel[]){
    this._orcamentos = cl;
  }

  get orcamentos(){
    return this._orcamentos;
  }
}
