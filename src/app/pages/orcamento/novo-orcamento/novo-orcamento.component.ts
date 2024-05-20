import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrcamentoDados, OrcamentoModel } from '../../../core/model/orcamento';
import { EtapaModel } from '../../../core/model/etapa-model';
import { EtapasStorageService } from '../../../core/storage/etapas-storage.service';
import { TipoOrcamento } from '../../../core/enum/etapa copy';
import { DropdownModule } from 'primeng/dropdown';
import { SinapStorageService } from '../../../core/storage/sinap-storage.service';
import { FornecedorStorageService } from '../../../core/storage/fornecedor-storage.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-novo-orcamento',
  standalone: true,
  imports: [CommonModule,FormsModule, ButtonModule,DropdownModule,AutoCompleteModule,
    InputTextModule,ReactiveFormsModule],
  templateUrl: './novo-orcamento.component.html',
  styleUrl: './novo-orcamento.component.scss'
})
export class NovoOrcamentoComponent implements OnInit{

  form:FormGroup;
  orcamento:OrcamentoModel = new OrcamentoModel();
  etapas:EtapaModel[] = [];
  orcamentosList:OrcamentoDados[]=[];
  tipos:any[] = [{value:TipoOrcamento.FORNECEDOR,nome:'Fornecedor'},{value:TipoOrcamento.SINAP,nome:'SINAP'}];
  filtredOrcamentos: any[] | undefined;

  constructor(
    private etapaStorage:EtapasStorageService,
    private sinapStorageService:SinapStorageService,
    private fornecedorStorageService:FornecedorStorageService,
    public ref: DynamicDialogRef


  ){}
  
  ngOnInit(): void {
    this.buildForm();
    this.config();
  }

  buildForm(){
  this.form = new FormGroup({
    etapa: new FormControl(this.orcamento.etapa,[Validators.required]),
    tipo: new FormControl(this.orcamento.tipo,[Validators.required]),
    quantidade: new FormControl(this.orcamento.dados.quantidade,[Validators.required]),
    codigo: new FormControl(this.orcamento.dados.codigo,[Validators.required]),

    });
  }

  config(){
    this.etapas = this.etapaStorage.etapas;
    this.orcamentosList = this.sinapStorageService.orcamentos;
  }

  changeOrcamentoTipo(ev){
    console.log(ev);
    if(ev.value.value == 0){
      this.orcamentosList = this.fornecedorStorageService.fornecedores;
    }else{
      this.orcamentosList = this.sinapStorageService.orcamentos;

    }
    
  }
  salvar(){

  }

  filterOrcamento(ev){

  }
  closeDialog(data?) {
    this.ref.close(data);
  }
}
