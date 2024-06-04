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
import { FornecedorService } from '../../../core/service/fornecedor.service';

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
  formValorUnitario:FormGroup;
  formContato:FormGroup;
  formfornecedor:FormGroup;
  formpagamento:FormGroup;
  formEndereco:FormGroup;

  fornecedor:OrcamentoDados = new OrcamentoDados();

  constructor(
    private toastService:ToastService,
    private spinnerService:SpinnerService,
    private orcamentoStorageService:OrcamentoStorageService,
    private fornecedorStorageService:FornecedorStorageService,
    public ref: DynamicDialogRef,
    private fornecedorService:FornecedorService,


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
      unidade: new FormControl(this.fornecedor.unidade,[Validators.required]),
    });
    this.formValorUnitario = new FormGroup({
      material: new FormControl(this.fornecedor.valorUnitario.material,[Validators.required]),
      maoDeObra: new FormControl(this.fornecedor.valorUnitario.maoDeObra,[Validators.required]),
  
    });
    this.formContato = new FormGroup({

      telefone: new FormControl(this.fornecedor.contato.telefone,[Validators.required]),
      email: new FormControl(this.fornecedor.contato.email,[Validators.required]),

    });
    this.formfornecedor = new FormGroup({

      empresa: new FormControl(this.fornecedor.fornecedor.empresa,[Validators.required]),
      cnpj: new FormControl(this.fornecedor.fornecedor.cnpj,[Validators.required]),

    });
    this.formpagamento = new FormGroup({

      compraMinima: new FormControl(this.fornecedor.pagamento.compraMinima,[Validators.required]),
      garantiaOferecida: new FormControl(this.fornecedor.pagamento.garantiaOferecida,[Validators.required]),
      prazoEntrega: new FormControl(this.fornecedor.pagamento.prazoEntrega,[Validators.required]),
    });
    this.formEndereco = new FormGroup({
      endereco: new FormControl(this.fornecedor.endereco.endereco,[Validators.required]),
      estado: new FormControl(this.fornecedor.endereco.estado,[Validators.required]),
      cidade: new FormControl(this.fornecedor.endereco.cidade,[Validators.required]),
      cep: new FormControl(this.fornecedor.endereco.cep,[Validators.required]),
    });
  }

  salvar(){
    
    if(this.form.invalid || this.formContato.invalid|| this.formEndereco.invalid || this.formValorUnitario.invalid || this.formfornecedor.invalid || this.formpagamento.invalid){
      this.toastService.showInfo("","Preencha todos os campos necessários!");
      return;
    }

    this.spinnerService.show();
    let novoOrcamento:OrcamentoDados = new OrcamentoDados();

    Object.assign(novoOrcamento,this.form.value);
    novoOrcamento.id = this.fornecedorStorageService.fornecedores.length+1;
    novoOrcamento.contato = this.formContato.value;
    novoOrcamento.fornecedor = this.formfornecedor.value;
    novoOrcamento.valorUnitario = this.formValorUnitario.value;
    novoOrcamento.pagamento = this.formpagamento.value;
    novoOrcamento.endereco = this.formEndereco.value;

    this.fornecedorService.salvar(novoOrcamento).subscribe({
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
