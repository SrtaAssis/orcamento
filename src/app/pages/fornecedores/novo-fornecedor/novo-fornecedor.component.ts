import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrcamentoDados, OrcamentoModel } from '../../../core/model/orcamento';
import { ToastService } from '../../../core/service/toast.service';
import { SpinnerService } from '../../../core/service/spinner.service';
import { OrcamentoStorageService } from '../../../core/storage/orcamento-storage.service';
import { FornecedorStorageService } from '../../../core/storage/fornecedor-storage.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-novo-fornecedor',
  standalone: true,
  imports: [CommonModule,FormsModule, ButtonModule,InputMaskModule,InputNumberModule,
    InputTextModule,ReactiveFormsModule],
  templateUrl: './novo-fornecedor.component.html',
  styleUrl: './novo-fornecedor.component.scss'
})
export class NovoFornecedorComponent implements OnInit{

  form:FormGroup;
  fornecedor:OrcamentoDados = new OrcamentoDados();

  constructor(
    private toastService:ToastService,
    private spinner:SpinnerService,
    private orcamentoStorageService:OrcamentoStorageService,
    private fornecedorStorageService:FornecedorStorageService,
    public ref: DynamicDialogRef


  ){}
  ngOnInit(): void {
    this.buildForm();
    // if(this.fornecedor){
    //   this.form.patchValue(this.fornecedor);
    // }
  }

  buildForm(){
    this.form = new FormGroup({
      descricao: new FormControl(this.fornecedor.descricao,[Validators.required]),
      material: new FormControl(this.fornecedor.valorUnitario.material,[Validators.required]),
      maoDeObra: new FormControl(this.fornecedor.valorUnitario.maoDeObra,[Validators.required]),
      unidade: new FormControl(this.fornecedor.unidade,[Validators.required]),
      empresa: new FormControl(this.fornecedor.fornecedor.empresa,[Validators.required]),
      cnpj: new FormControl(this.fornecedor.fornecedor.cnpj,[Validators.required]),
      telefone: new FormControl(this.fornecedor.contato.telefone,[Validators.required]),
      email: new FormControl(this.fornecedor.contato.email,[Validators.required]),
      endereco: new FormControl(this.fornecedor.endereco.endereco,[Validators.required]),
      estado: new FormControl(this.fornecedor.endereco.estado,[Validators.required]),
      cidade: new FormControl(this.fornecedor.endereco.cidade,[Validators.required]),
      cep: new FormControl(this.fornecedor.endereco.cep,[Validators.required]),
      compraMinima: new FormControl(this.fornecedor.pagamento.compraMinima,[Validators.required]),
      garantiaOferecida: new FormControl(this.fornecedor.pagamento.garantiaOferecida,[Validators.required]),
      prazoEntrega: new FormControl(this.fornecedor.pagamento.prazoEntrega,[Validators.required]),
    });
  }

  salvar(){
    if(this.form.invalid){
      this.toastService.showInfo("","Preencha todos os campos necessários!");
      return;
    }
    let novoOrcamento:OrcamentoDados = new OrcamentoDados();
    this.spinner.show();
    Object.assign(novoOrcamento,this.form.value)
    console.log(novoOrcamento);
    
    this.fornecedorStorageService.fornecedores.push(novoOrcamento);
    this.spinner.hide();

  }
  closeDialog(data?) {
    this.ref.close(data);
  }
}
