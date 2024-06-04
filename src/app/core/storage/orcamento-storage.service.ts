import { Injectable } from '@angular/core';
import { OrcamentoModel } from '../model/orcamento';
import { TipoOrcamento } from '../enum/tipo-orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoStorageService {


  private _orcamentos:OrcamentoModel[] = [];
  
  constructor() {
    this._orcamentos = [{
      etapa:1,
      tipo:TipoOrcamento.SINAP,
      dados:{
        id:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        unidade:'H'
      }
    },
    {
      etapa:1,
      tipo:TipoOrcamento.SINAP,
      dados:{
        id:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        unidade:'H'
      }
    },
    {
      etapa:1,
      tipo:TipoOrcamento.SINAP,
      dados:{
        id:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        unidade:'H'
      }
    },
    {
      etapa:2,
      tipo:TipoOrcamento.SINAP,
      dados:{
        id:90778,
        descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
        quantidade:2,
        valorUnitario:{
          maoDeObra:84.54,
          material:1.44
        },
        unidade:'H'
      }
    }];
   }

  set orcamentos(cl:OrcamentoModel[]){
    this._orcamentos = cl;
  }

  get orcamentos(){
    return this._orcamentos;
  }
}
