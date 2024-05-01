import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Cliente } from '../../core/model/cliente';
import { ClienteStorageService } from '../../core/storage/cliente-storage.service';
import { OrcamentoDados, OrcamentoModel } from '../../core/model/orcamento';
import { Etapas } from '../../core/enum/etapa';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../core/service/toast.service';
import { InputTextModule } from 'primeng/inputtext';
import { OrcamentoStorageService } from '../../core/storage/orcamento-storage.service';
import { BotoesExportacaoComponent } from '../../core/component/botoes-exportacao/botoes-exportacao.component';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule,FormsModule,ReactiveFormsModule,InputTextModule,BotoesExportacaoComponent],
  providers:[DatePipe],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.scss'
})
export class OrcamentoComponent implements OnInit{
  cliente:Cliente = new Cliente();
  etapas:any[] = Object.values(Etapas);
  clonedOrcamento: { [s: number]: OrcamentoModel } = {};

  orcamentos:OrcamentoModel[] = [];
  gerandoPdf:boolean = false;
  constructor(
    private clienteStorage:ClienteStorageService,
    private orcamentoStorage:OrcamentoStorageService,
    private datePipe: DatePipe,
    private toast:ToastService

  ){}

  ngOnInit(): void {
    this.cliente = this.clienteStorage.cliente;
    this.getOrcamentos();
  }
  
  getOrcamentos(){
    this.orcamentos = this.orcamentoStorage.orcamentos;
  }

  getData(data) {
    const dateFormat: string = "dd/MM/yyyy";

    return this.datePipe.transform(data, dateFormat);
  }

  getValorTotal(dados:OrcamentoDados){
    let total = 0;
    total = (dados.valorUnitario.maoDeObra+dados.valorUnitario.material)*dados.quantidade;
    return total;

  }

  getEtapa(etapa){    
    return this.etapas.filter(e=>e.value==etapa)[0].nome;
  }

  errorUrlPhoto(evt){
    evt.target.src = '/assets/fotos/sem_foto.png';
  }

  onRowEditInit(orcamento: OrcamentoModel) {
    this.clonedOrcamento[orcamento.dados.codigo as number] = { ...orcamento };
  }

  onRowEditSave(orcamento: OrcamentoModel) {
      if (orcamento.dados.valorUnitario.maoDeObra > 0) {
          delete this.clonedOrcamento[orcamento.dados.codigo as number];
          this.toast.showSuccess('','Orcamento foi editado');
      } else {
        this.toast.showError('Valor inválido');
      }
  }

  onRowEditCancel(orcamento: OrcamentoModel, index: number) {
      this.orcamentos[index] = this.clonedOrcamento[orcamento.dados.codigo as number];
      delete this.clonedOrcamento[orcamento.dados.codigo as number];
  }

  inicioProcessamento(tipo: string): void {
    this.gerandoPdf = true;
  }

  fimProcessamento(tipo: string): void {
    this.gerandoPdf = false;
  }
}
