import { Injectable } from '@angular/core';
import { TipoOrcamento } from '../enum/etapa copy';
import { OrcamentoDados, OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class SinapStorageService {


  private _orcamentos:OrcamentoDados[] = [];
  
  constructor() {
    this._orcamentos = [{
      codigo:1,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:2,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:3,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:4,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:5,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:6,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      codigo:7,
      descricao:"ENGENHEIRO CIVIL DE OBRA PLENO COM ENCARGOS COMPLEMENTARES",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    ]
   }

  set orcamentos(cl:OrcamentoDados[]){
    this._orcamentos = cl;
  }
  get orcamentos(){
    return this._orcamentos;
  }}
