import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EtapaModel } from '../../core/model/etapa-model';
import { Etapas } from '../../core/enum/etapa';
import { OrcamentoModel } from '../../core/model/orcamento';
import { TableModule } from 'primeng/table';
import { EtapasStorageService } from '../../core/storage/etapas-storage.service';
import { OrcamentoStorageService } from '../../core/storage/orcamento-storage.service';
import { ClienteStorageService } from '../../core/storage/cliente-storage.service';
import { Cliente } from '../../core/model/cliente';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NovaEtapaComponent } from './nova-etapa/nova-etapa.component';
import { KformatterPipe } from '../../core/pipe/kformatter.pipe';
import { EtapaService } from '../../core/service/etapa.service';
import { SpinnerService } from '../../core/service/spinner.service';
import { OrcamentoService } from '../../core/service/orcamento.service';
import { ClienteService } from '../../core/service/cliente.service';
import { ToastService } from '../../core/service/toast.service';

@Component({
  selector: 'app-etapas',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,ReactiveFormsModule,ButtonModule,TableModule,KformatterPipe],
  providers: [DialogService],
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.scss'
})
export class EtapasComponent implements OnInit{
  
  etapasList:EtapaModel[] = [];
  orcamentoCliente:OrcamentoModel[] = [];
  cliente:Cliente = new Cliente();
  ref: DynamicDialogRef | undefined;
  MOTotal:number = 0;
  materialTotal:number = 0;
  LSTotal:number = 0;
  totalAll:number = 0;
  BDITotal:number = 0;
  porcentagemTotal:number = 0;
  porcentagemMO:number = 0;
  porcentagemMaterial:number = 0;
  loading:boolean = false;

  constructor(
    private etapasStorage:EtapasStorageService,
    public dialogService: DialogService,
    public etapaService: EtapaService,
    public orcamentoService: OrcamentoService,
    public clienteService: ClienteService,
    public toastService:ToastService,
    public spinnerService: SpinnerService


  ){}

  ngOnInit(): void {
    this.configTabela();
  }

  getEtapas(){
    this.etapaService.getEtapas().subscribe({
      next: (result) => {
        this.etapasList = result.data || [];
        this.etapasStorage.etapas = this.etapasList;

      }, error: (err) => {
      }
    });
  }

  getOrcamento(){

    this.orcamentoService.getOrcamento().subscribe({
      next: (result) => {
        this.orcamentoCliente = result.data || [];

      }, error: (err) => {
      }
    });
  }
  
  getCliente(){

    this.clienteService.getCliente().subscribe({
      next: (result) => {
        this.cliente = result.data[0] || null;

      }, error: (err) => {
      }
    });
  }
  async configTabela() {
    try {
      this.loading = true;
      await this.getEtapas();
      await this.getCliente();
      await this.getOrcamento();
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await this.getTotal();
      this.loading = false;


    } catch (error) {
      this.loading = false;
      console.error('Error in configSalvarSinap:', error);
      // Handle the error (e.g., retry, notify the user, etc.)
    }
  }
 
  abrirCadastroEtapas(){
    this.ref = this.dialogService.open(NovaEtapaComponent, { 
      header: 'Cadastrar Nova Etapa',
    });
    this.ref.onClose.subscribe((refresh: boolean) => {
      if (refresh) {
          this.configTabela();
      }
    });
  }
  
  getTotal(){
    if(!this.orcamentoCliente || !this.cliente){
      this.toastService.showInfo("Dados faltando!","Pra realizar os cálculos é necessário dados do cliente e orçamento.")
    } 

    if(this.orcamentoCliente && this.cliente){
      this.MOTotal = this.orcamentoCliente.map(o=>o.dados.valorUnidade.maoDeObra*o.dados.quantidade).reduce((a,b)=>(a+b),0) || 0;
      this.materialTotal = this.orcamentoCliente.map(o=>o.dados.valorUnidade.material*o.dados.quantidade).reduce((a,b)=>a+b,0) || 0;
      this.LSTotal = this.MOTotal*(this.cliente.encargosSociais/100) || 0;
      this.BDITotal = (this.MOTotal+this.materialTotal+this.LSTotal)*(this.cliente.bdi/100) || 0;
      this.totalAll = this.MOTotal+this.materialTotal+this.LSTotal+this.BDITotal || 0;
      this.porcentagemTotal = 100;
      this.porcentagemMO = ((this.MOTotal+this.LSTotal+this.BDITotal)/this.totalAll)*100 || 0;
      this.porcentagemMaterial = ((this.materialTotal)/this.totalAll)*100 || 0;
  
    }

  }

  getTotalEtapas(tipo,value){
    let MO = 0;
    let material = 0;
    let LS = 0;
    let BDI = 0;
    let total = 0;
    let porcentagem = 0;    
    
    if(this.orcamentoCliente && this.cliente){
      MO = this.orcamentoCliente.filter(o=>o.etapa == value).map(o=>o.dados.valorUnidade.maoDeObra*o.dados.quantidade).reduce((a,b)=>a+b,0) || 0;
      material = this.orcamentoCliente?.filter(o=>o.etapa == value).map(o=>o.dados.valorUnidade.material*o.dados.quantidade).reduce((a,b)=>a+b,0) || 0;
      LS = MO*(this.cliente.encargosSociais/100) || 0;
      BDI = (MO+material+LS)*(this.cliente.bdi/100) || 0;
      total = MO+material+BDI+LS || 0;
      porcentagem =(total/this.totalAll)*100 || 0;
    }


    switch (tipo){
      case 'MO':
        return MO.toFixed(2);
      case 'material':
        return material.toFixed(2);
      case 'LS':
        return LS.toFixed(2);
      case 'total':
        return total.toFixed(2);
      case 'BDI':
        return BDI.toFixed(2);
      case 'porcentagem':
        return porcentagem.toFixed(2)+'%';
      default:
        return '-';
    }
  }
}
