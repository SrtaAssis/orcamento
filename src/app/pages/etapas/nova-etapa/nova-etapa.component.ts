import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EtapasStorageService } from '../../../core/storage/etapas-storage.service';
import { EtapaModel } from '../../../core/model/etapa-model';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EtapaService } from '../../../core/service/etapa.service';
import { ToastService } from '../../../core/service/toast.service';
import { SpinnerService } from '../../../core/service/spinner.service';

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
    public ref: DynamicDialogRef,
    private etapaService:EtapaService,
    private toastService:ToastService,
    private spinnerService:SpinnerService,
  ){}

  ngOnInit(): void {
    this.getEtapas();
  }

  getEtapas(){
    this.etapas = this.etapasStorage.etapas;
  }

  salvar(){
    if(!this.etapaNova.nome){
      this.toastService.showWarn('Info',"Preencha todos os campos necessários");
      this.spinnerService.hide();
      return
    }
    this.spinnerService.show();
    // this.etapas.push(this.etapaNova)
    // this.etapasStorage.etapas = this.etapas;
    this.etapaService.salvar(this.etapaNova).subscribe({
      next: (result) => {
        this.toastService.showSuccess('Salvo',"Salvo com sucesso!");
        this.spinnerService.hide();
        this.closeDialog(true);

      }, error: (err) => {
        this.toastService.showError(err);
        this.spinnerService.hide();
        this.closeDialog(false);
      }
    });
  }

  closeDialog(data?) {
    this.ref.close(data);
  }
}
