import { Injectable } from '@angular/core';
import { OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoStorageService {


  private _orcamentos:OrcamentoModel[] = [];
  
  constructor() {
    this._orcamentos = [{
      etapa:1,
      dados:{
        codigo:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        total:0,
        unidade:'H'
      }
    },
    {
      etapa:1,
      dados:{
        codigo:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        total:0,
        unidade:'H'
      }
    },
    {
      etapa:1,
      dados:{
        codigo:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        total:0,
        unidade:'H'
      }
    },
    {
      etapa:2,
      dados:{
        codigo:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        total:0,
        unidade:'H'
      }
    }];
   }

  set orcamentos(cl:OrcamentoModel[]){
    this._orcamentos = cl;
  }
  get orcamentos(){
    return this._orcamentos;
  }}
