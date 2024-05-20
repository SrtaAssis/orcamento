import { Injectable } from '@angular/core';
import { OrcamentoDados, OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class FornecedorStorageService {

  private _fornecedores:OrcamentoDados[] = [];
  
  constructor() {}

  set fornecedores(cl:OrcamentoDados[]){
    this._fornecedores = cl;
  }
  get fornecedores(){
    return this._fornecedores;
  }
}
