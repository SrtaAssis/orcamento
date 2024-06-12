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
import { EtapaService } from '../../core/service/etapa.service';
import { ConfirmationService } from 'primeng/api';

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
    private clienteService:ClienteService,
    public etapaService: EtapaService,
    private confirmationService: ConfirmationService,
  ){}

  ngOnInit(): void {
    this.getCliente();
    this.getOrcamentos();    
    this.getEtapas();
  }

  getEtapas(){
    this.spinnerService.show();

    this.etapaService.getEtapas().subscribe({
      next: (result) => {
        this.etapas = result.data || [];
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getCliente(){
    this.spinnerService.show();
    this.clienteService.getCliente().subscribe({
      next: (result) => {
        this.cliente = result.data[0] || new Cliente();
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getOrcamentos(){
    this.spinnerService.show();
    this.orcamentoService.getOrcamento().subscribe({
      next: (result) => {
        this.orcamentos = result.data;
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
        
        this.getOrcamentos();
      }
    });
  }
  
  
  confirmarExclusao(orcamento:OrcamentoModel){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Tem certeza que deseja o excluir este orçamento?`,
      header: 'Não será possível reverter essa ação!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Excluir',
      rejectLabel:'Cancelar',
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.excluir(orcamento.id);
      },
      reject: () => {}
    }); 
  }
  excluir(id){
    this.spinnerService.show();
    this.orcamentoService.delete(id).subscribe({
      next:(result)=>{
        this.spinnerService.hide();
        this.getOrcamentos();

      },error:(err)=>{
        this.spinnerService.hide();

    }})
  }

  getData(data) {
    const dateFormat: string = "dd/MM/yyyy";

    return this.datePipe.transform(data, dateFormat);
  }

  getValorTotal(dados:OrcamentoDados){
    let total = 0;
    total = (dados.valorUnidade.maoDeObra+dados.valorUnidade.material)*dados.quantidade;
    return total.toFixed(2);

  }

  getEtapa(etapa){    
    return this.etapas.filter(e=>e.id==etapa)[0]?.nome;
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
