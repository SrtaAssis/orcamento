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
  MOTotal:number;
  materialTotal:number;
  LSTotal:number;
  totalAll:number;
  BDITotal:number;
  porcentagemTotal:number;
  porcentagemMO:number;
  porcentagemMaterial:number;

  constructor(
    private etapasStorage:EtapasStorageService,
    public dialogService: DialogService,
    public etapaService: EtapaService,
    public orcamentoService: OrcamentoService,
    public clienteService: ClienteService,

    public spinnerService: SpinnerService


  ){}

  ngOnInit(): void {
    this.configTabela();
  }

  getEtapas(){
    this.etapaService.getEtapas().subscribe({
      next: (result) => {
        this.etapasList = result;
        this.etapasStorage.etapas = this.etapasList;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getOrcamento(){
    this.orcamentoService.getOrcamento().subscribe({
      next: (result) => {
        this.orcamentoCliente = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }
  
  getCliente(){
    this.clienteService.getCliente().subscribe({
      next: (result) => {
        this.orcamentoCliente = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  configTabela(){
    this.getOrcamento();
    this.getEtapas();
    this.getCliente();
    this.getTotal();
    // this.etapasList = this.etapasStorage.etapas;
    // this.orcamentoCliente = this.orcamentoStorage.orcamentos;
    // this.cliente = this.clienteStorage.cliente;
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
    this.MOTotal = this.orcamentoCliente.map(o=>o.dados.valorUnitario.maoDeObra*o.dados.quantidade).reduce((a,b)=>(a+b),0);
    this.materialTotal = this.orcamentoCliente.map(o=>o.dados.valorUnitario.material*o.dados.quantidade).reduce((a,b)=>a+b,0);
    this.LSTotal = this.MOTotal*(this.cliente.encargosSociais/100);
    this.BDITotal = (this.MOTotal+this.materialTotal+this.LSTotal)*(this.cliente.bdi/100);
    this.totalAll = this.MOTotal+this.materialTotal+this.LSTotal+this.BDITotal;
    this.porcentagemTotal = 100;
    this.porcentagemMO = ((this.MOTotal+this.LSTotal+this.BDITotal)/this.totalAll)*100;
    this.porcentagemMaterial = ((this.materialTotal)/this.totalAll)*100;

  }

  getTotalEtapas(tipo,value){
    const MO = this.orcamentoCliente.filter(o=>o.etapa == value).map(o=>o.dados.valorUnitario.maoDeObra*o.dados.quantidade).reduce((a,b)=>a+b,0);
    const material = this.orcamentoCliente.filter(o=>o.etapa == value).map(o=>o.dados.valorUnitario.material*o.dados.quantidade).reduce((a,b)=>a+b,0);
    const LS = MO*(this.cliente.encargosSociais/100);
    const BDI = (MO+material+LS)*(this.cliente.bdi/100);
    const total = MO+material+BDI+LS;
    const porcentagem =(total/this.totalAll)*100;

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
