import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrcamentoDados, OrcamentoModel } from '../../../core/model/orcamento';
import { EtapaModel } from '../../../core/model/etapa-model';
import { EtapasStorageService } from '../../../core/storage/etapas-storage.service';
import { SinapStorageService } from '../../../core/storage/sinap-storage.service';
import { FornecedorStorageService } from '../../../core/storage/fornecedor-storage.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerService } from '../../../core/service/spinner.service';
import { ToastService } from '../../../core/service/toast.service';
import { TipoOrcamento } from '../../../core/enum/tipo-orcamento';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrcamentoService } from '../../../core/service/orcamento.service';
import { OrcamentoStorageService } from '../../../core/storage/orcamento-storage.service';
import { EtapaService } from '../../../core/service/etapa.service';
import { FornecedorService } from '../../../core/service/fornecedor.service';
import { SinapService } from '../../../core/service/sinap.service';

@Component({
  selector: 'app-novo-orcamento',
  standalone: true,
  imports: [CommonModule,FormsModule, ButtonModule,DropdownModule,AutoCompleteModule,InputNumberModule,
    InputTextModule,ReactiveFormsModule,TableModule,ProgressBarModule,HttpClientModule],
  templateUrl: './novo-orcamento.component.html',
  styleUrl: './novo-orcamento.component.scss'
})
export class NovoOrcamentoComponent implements OnInit{

  form:FormGroup;
  orcamento:OrcamentoModel = new OrcamentoModel();
  etapas:EtapaModel[] = [];
  orcamentosList:OrcamentoDados[]=[];
  sinap:OrcamentoDados[]=[];
  fornecedores:OrcamentoDados[]=[];

  tipos:any[] = [TipoOrcamento.FORNECEDOR,TipoOrcamento.SINAP];
  filtredOrcamentos: any[] | undefined;
  loading:boolean = false;
  searchValue: string | undefined;
  orcamentoSelecionado:OrcamentoDados;
  isEditar:boolean = false;

  constructor(
    private etapaStorage:EtapasStorageService,
    private sinapStorageService:SinapStorageService,
    private fornecedorStorageService:FornecedorStorageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService:ToastService,
    private spinnerService:SpinnerService,
    private orcamentoService:OrcamentoService,
    private etapaService:EtapaService,
    private fornecedorService:FornecedorService,
    private sinapService:SinapService,

    private orcamentoStorageService:OrcamentoStorageService

  ){

  }
  
  ngOnInit(): void {
    if( this.config.data?.orcamento){
      this.orcamento = this.config.data.orcamento;
      console.log( this.config.data);
      this.configEdit();
      this.isEditar = true;
    }else{
      this.configCadastro();
    }
    this.buildForm();
  }

  buildForm(){
  this.form = new FormGroup({
    etapa: new FormControl(this.orcamento.etapa,[Validators.required]),
    tipo: new FormControl(this.orcamento.tipo,[Validators.required]),
    quantidade: new FormControl(this.orcamento.dados.quantidade,[Validators.required]),
    maoDeObra: new FormControl(this.orcamento.dados.valorUnitario.maoDeObra,[Validators.required]),
    material: new FormControl(this.orcamento.dados.valorUnitario.material,[Validators.required]),
    dados: new FormControl(this.orcamento.dados,[Validators.required]),
    });

  }

  configCadastro(){
    this.getEtapas();
    this.getSinap();
    this.getFornecedor();
    this.form.get('tipo').setValue(TipoOrcamento.SINAP);
    this.orcamentosList = this.sinap;
  }

  configEdit(){
    this.form.get('tipo').disable();
    this.etapas = this.etapaStorage.etapas;
    this.orcamentosList = [this.orcamento.dados];
    console.log(this.orcamentosList);

  }

  getEtapas(){
    this.etapaService.getEtapas().subscribe({
      next: (result) => {
        this.etapas = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getSinap(){
    this.sinapService.getSinap().subscribe({
      next: (result) => {
        this.sinap = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getFornecedor(){
    this.fornecedorService.getFornecedores().subscribe({
      next: (result) => {
        this.fornecedores = result;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  changeOrcamentoTipo(ev){
    console.log(ev);
    if(!this.isEditar){
      if(ev.value == TipoOrcamento.FORNECEDOR){
        this.orcamentosList = this.fornecedorStorageService.fornecedores;
      }else{
        this.orcamentosList = this.sinapStorageService.orcamentos;
  
      }
    }
    
  }

  changeOrcamentoSelecionado(ev){

    if(ev?.data){
      this.form.get('maoDeObra').setValue(ev.data.valorUnitario.maoDeObra);
      this.form.get('material').setValue(ev.data.valorUnitario.material);
    }
  }

  salvar(){
    this.form.get("dados").setValue(this.orcamentoSelecionado);
    
    if(this.form.invalid){
      this.toastService.showInfo("","Preencha todos os campos necessários!");
      return;
    }
    const salvar = new OrcamentoModel();
    salvar.etapa = this.form.get("etapa").value;
    salvar.tipo = this.form.get("tipo").value;
    salvar.dados = this.orcamentoSelecionado;
    salvar.dados.quantidade = this.form.get("quantidade").value;
    salvar.dados.valorUnitario.maoDeObra = this.form.get("maoDeObra").value;
    salvar.dados.valorUnitario.material = this.form.get("material").value;
    
    const orcamentosSalvos: OrcamentoModel[] = [];

    // Iterar sobre os objetos de dados recebidos
    for (const orcamento of this.orcamentoStorageService.orcamentos) {
      // Adicionar o OrcamentoModel ao array de orcamentos salvos
      orcamentosSalvos.push(orcamento);
    }
    orcamentosSalvos.push(salvar);
    this.orcamentoStorageService.orcamentos = orcamentosSalvos;
    console.log(orcamentosSalvos);
    this.closeDialog(true);
    // this.orcamentoService.salvar(salvar).subscribe({
    //   next: (result) => {
    //     this.toastService.showSuccess('Salvo',"Salvo com sucesso!");
    //     this.spinnerService.hide();
    //     this.closeDialog(true);

    //   }, error: (err) => {
    //     this.toastService.showError(err);
    //     this.spinnerService.hide();
    //     this.closeDialog(false);
    //   }
    // });

  }


  onInput(event: Event, dt: Table): void {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
  }

  clear(dt: Table): void {
    this.searchValue = '';
    dt.clear();
  }

  closeDialog(data?) {
    this.ref.close(data);
  }

}
