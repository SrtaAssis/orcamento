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

@Component({
  selector: 'app-etapas',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,ReactiveFormsModule,ButtonModule,TableModule],
  providers: [DialogService],
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.scss'
})
export class EtapasComponent implements OnInit{
  etapasList:EtapaModel[] = [];
  orcamentoCliente:OrcamentoModel[] = [];
  cliente:Cliente = new Cliente();
  ref: DynamicDialogRef | undefined;

  constructor(
    private etapasStorage:EtapasStorageService,
    private orcamentoStorage:OrcamentoStorageService,
    private clienteStorage:ClienteStorageService,
    public dialogService: DialogService

  ){}

  ngOnInit(): void {
    this.configTabela();
  }

  configTabela(){
    this.etapasList = this.etapasStorage.etapas;
    this.orcamentoCliente = this.orcamentoStorage.orcamentos;
    this.cliente = this.clienteStorage.cliente;
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

  getTotalEtapas(tipo,value){
    const MO = this.orcamentoCliente.filter(o=>o.etapa == value).map(o=>o.dados.valorUnitario.maoDeObra).reduce((a,b)=>a+b,0);
    const material = this.orcamentoCliente.filter(o=>o.etapa == value).map(o=>o.dados.valorUnitario.material).reduce((a,b)=>a+b,0);
    const LS = MO*this.cliente.encargosSociais;
    const total = MO+material;
    const BDI = (total+LS)*this.cliente.bdi;
    const porcentagem = total;

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
