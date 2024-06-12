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
    public spinnerService:SpinnerService,
    private orcamentoService:OrcamentoService,
    private etapaService:EtapaService,
    private fornecedorService:FornecedorService,
    private sinapService:SinapService,

    private orcamentoStorageService:OrcamentoStorageService

  ){

  }
  
  ngOnInit(): void {
    if( this.config.data?.orcamento){
      this.getEtapas();
      this.orcamento = this.config.data.orcamento;
      this.buildForm();
      this.configEdit();
    }else{
      this.buildForm();
      this.configCadastro();
    }
  }

  buildForm(){
  this.form = new FormGroup({
    id: new FormControl(this.orcamento.id),
    etapa: new FormControl(this.orcamento.etapa,[Validators.required]),
    tipo: new FormControl(this.orcamento.tipo,[Validators.required]),
    quantidade: new FormControl(this.orcamento.dados.quantidade,[Validators.required]),
    maoDeObra: new FormControl(this.orcamento.dados.valorUnidade.maoDeObra,[Validators.required]),
    material: new FormControl(this.orcamento.dados.valorUnidade.material,[Validators.required]),
    dados: new FormControl(this.orcamento.dados,[Validators.required]),
    });

  }

  configCadastro(){
    this.getEtapas();
    this.getSinap();
    this.getFornecedor();
    this.form.get('tipo').setValue(TipoOrcamento.SINAP);
  }

  configEdit(){
    this.isEditar = true;
    this.form.patchValue(this.config.data.orcamento);
    this.form.get('tipo').disable();
    // this.etapas = this.etapaStorage.etapas;
    this.orcamentosList = [this.config.data.orcamento.dados];
    this.orcamentoSelecionado = this.config.data.orcamento.dados;
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

  getSinap(){
    this.spinnerService.show();

    this.sinapService.getSinap().subscribe({
      next: (result) => {
        this.sinap = result.data || [];
        this.orcamentosList = this.sinap;
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  getFornecedor(){
    this.spinnerService.show();

    this.fornecedorService.getFornecedores().subscribe({
      next: (result) => {
        this.fornecedores = result.data || [];
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  changeOrcamentoTipo(ev){
    if(!this.isEditar){
      if(ev.value == TipoOrcamento.FORNECEDOR){
        this.orcamentosList = this.fornecedores;
      }else{
        this.orcamentosList = this.sinap;
  
      }
    }
    
  }

  changeOrcamentoSelecionado(ev){

    if(ev?.data){
      this.form.get('maoDeObra').setValue(ev.data.valorUnidade.maoDeObra);
      this.form.get('material').setValue(ev.data.valorUnidade.material);
    }
  }

  salvar(){
    this.form.get("dados").setValue(this.orcamentoSelecionado);
    
    if(this.form.invalid){
      this.toastService.showInfo("","Preencha todos os campos necessários!");
      return;
    }
    const salvar = new OrcamentoModel();
    salvar.id = this.form.get("id").value;
    salvar.etapa = this.form.get("etapa").value;
    salvar.tipo = this.form.get("tipo").value;
    salvar.dados = this.orcamentoSelecionado;
    salvar.dados.quantidade = this.form.get("quantidade").value;
    salvar.dados.valorUnidade.maoDeObra = this.form.get("maoDeObra").value;
    salvar.dados.valorUnidade.material = this.form.get("material").value;
    
    const orcamentosSalvos: OrcamentoModel[] = [];

    // Iterar sobre os objetos de dados recebidos
    for (const orcamento of this.orcamentoStorageService.orcamentos) {
      // Adicionar o OrcamentoModel ao array de orcamentos salvos
      orcamentosSalvos.push(orcamento);
    }
    orcamentosSalvos.push(salvar);
    this.orcamentoStorageService.orcamentos = orcamentosSalvos;
    // this.closeDialog(true);
    this.orcamentoService.salvar(salvar).subscribe({
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
