import { Injectable } from '@angular/core';
import { TipoOrcamento } from '../enum/tipo-orcamento';
import { OrcamentoDados, OrcamentoModel } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class SinapStorageService {


  private _orcamentos:OrcamentoDados[] = [];
  
  constructor() {
    this._orcamentos = [{
      id:1,
      descricao:"TESTE 01",
      quantidade:2,
      valorUnitario:{
        maoDeObra:234,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:2,
      descricao:"TESTE 02",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:3,
      descricao:"TESTE 03",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:4,
      descricao:"TESTE 04",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:5,
      descricao:"TESTE 05",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:6,
      descricao:"TESTE 06",
      quantidade:2,
      valorUnitario:{
        maoDeObra:84.54,
        material:1.44
      },
      unidade:'H'
    },
    {
      id:7,
      descricao:"TESTE 07",
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
