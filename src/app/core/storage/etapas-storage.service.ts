import { Injectable } from '@angular/core';
import { EtapaModel } from '../model/etapa-model';
import { Etapas } from '../enum/etapa';

@Injectable({
  providedIn: 'root'
})
export class EtapasStorageService {

  private _etapas:EtapaModel[] = [];
  constructor() {
    this._etapas = Object.values(Etapas);
   }

  set etapas(cl:EtapaModel[]){
    this._etapas = cl;
  }
  get etapas(){
    return this._etapas;
  }
}
