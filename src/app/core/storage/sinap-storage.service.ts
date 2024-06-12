import { Injectable } from '@angular/core';
import { TipoOrcamento } from '../enum/tipo-orcamento';
import { OrcamentoDados, OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class SinapStorageService {


  private _orcamentos:OrcamentoDados[] = [];
  
  constructor() {
   }

  set orcamentos(cl:OrcamentoDados[]){
    this._orcamentos = cl;
  }
  get orcamentos(){
    return this._orcamentos;
  }}
