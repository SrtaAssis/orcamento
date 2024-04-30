import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EtapasStorageService } from '../../../core/storage/etapas-storage.service';
import { EtapaModel } from '../../../core/model/etapa-model';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-nova-etapa',
  standalone: true,
  imports: [CommonModule,FormsModule, ButtonModule,
    InputTextModule,ReactiveFormsModule],
  templateUrl: './nova-etapa.component.html',
  styleUrl: './nova-etapa.component.scss'
})
export class NovaEtapaComponent implements OnInit{
  etapas:EtapaModel[] = [];
  etapaNova:EtapaModel = new EtapaModel();
  constructor(
    private etapasStorage:EtapasStorageService,
    public ref: DynamicDialogRef
  ){}

  ngOnInit(): void {
    this.getEtapas();
  }

  getEtapas(){
    this.etapas = this.etapasStorage.etapas;
  }

  salvar(){
    if(!this.etapaNova.nome){
      return;
    }
    this.etapaNova.value = this.etapas.length+1;
    this.etapas.push(this.etapaNova)
    this.etapasStorage.etapas = this.etapas;
    this.closeDialog(true);
  }

  closeDialog(data?) {
    this.ref.close(data);
  }
}
