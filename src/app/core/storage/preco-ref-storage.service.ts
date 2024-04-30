import { Injectable } from '@angular/core';
import { PrecoRefInsumos } from '../model/preco-ref-insumos';

@Injectable({
  providedIn: 'root'
})
export class PrecoRefStorageService {
  private _precoRefInsumos:PrecoRefInsumos = new PrecoRefInsumos();
  constructor() { }

  get precoRefInsumos(){
    return this._precoRefInsumos;
  }
  set precoRefInsumos(arq:PrecoRefInsumos){
    this._precoRefInsumos = arq;
  }
}
