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
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { NovoOrcamentoComponent } from './novo-orcamento/novo-orcamento.component';
import { OrcamentoService } from '../../core/service/orcamento.service';
import { SpinnerService } from '../../core/service/spinner.service';
import { ClienteService } from '../../core/service/cliente.service';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule,FormsModule,ReactiveFormsModule,InputTextModule,BotoesExportacaoComponent],
  providers:[DatePipe,DialogService],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.scss'
})
export class OrcamentoComponent implements OnInit{
  cliente:Cliente = new Cliente();
  etapas:any[] = Object.values(Etapas);
  clonedOrcamento: { [s: number]: OrcamentoModel } = {};

  orcamentos:OrcamentoModel[] = [];
  gerandoPdf:boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(
    private clienteStorage:ClienteStorageService,
    private orcamentoStorage:OrcamentoStorageService,
    private datePipe: DatePipe,
    private toast:ToastService,
    public dialogService: DialogService,
    private spinnerService:SpinnerService,
    private orcamentoService:OrcamentoService,
    private clienteService:ClienteService



  ){}

  ngOnInit(): void {
    this.getCliente();
    this.getOrcamentos();    

  }

  getCliente(){
    this.clienteService.getCliente().subscribe({
      next: (result) => {
        this.cliente = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getOrcamentos(){
    this.orcamentoService.getOrcamento().subscribe({
      next: (result) => {
        this.orcamentos = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  novoOrcamento(orcamento?){
    this.ref = this.dialogService.open(NovoOrcamentoComponent, { 
      header: 'Cadastrar Novo Orçamento',
      width:'60%',
      data:{orcamento}
    });
    this.ref.onClose.subscribe((refresh: boolean) => {
      if (refresh) {
        console.log("refresh");
        
        this.getOrcamentos();
      }
    });
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

  inicioProcessamento(tipo: string): void {
    this.gerandoPdf = true;
  }

  fimProcessamento(tipo: string): void {
    this.gerandoPdf = false;
  }
}
