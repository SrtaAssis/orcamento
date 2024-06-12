import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KformatterPipe } from '../../core/pipe/kformatter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Fornecedor } from '../../core/model/fornecedor';
import { OrcamentoDados } from '../../core/model/orcamento';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FornecedorStorageService } from '../../core/storage/fornecedor-storage.service';
import { NovoFornecedorComponent } from './novo-fornecedor/novo-fornecedor.component';
import { FornecedorService } from '../../core/service/fornecedor.service';
import { SpinnerService } from '../../core/service/spinner.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,ReactiveFormsModule,ButtonModule,TableModule],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss',
  providers: [DialogService],

})
export class FornecedoresComponent implements OnInit{
  fornecedores:OrcamentoDados[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private fornecedoresStorage:FornecedorStorageService,
    public dialogService: DialogService,
    public spinnerService:SpinnerService,
    private confirmationService: ConfirmationService,
    private fornecedorService:FornecedorService,

  ){}

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores(){
    this.spinnerService.show();
    this.fornecedorService.getFornecedores().subscribe({
      next:(result)=>{
        this.fornecedores = result.data;
        this.spinnerService.hide();

      },error:(err)=>{
        this.spinnerService.hide();

    }})
  }


  abrirCadastroFornecedores(fornecedor?){
    this.ref = this.dialogService.open(NovoFornecedorComponent, { 
      header: 'Cadastrar Novo Fornecedor',
      width:'80%',
      data:{fornecedor}
    });
    this.ref.onClose.subscribe((refresh: boolean) => {
      if (refresh == true) {
          this.getFornecedores();
      }
    });
  }

  confirmarExclusaoFornecedor(fornecedor:OrcamentoDados){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Tem certeza que deseja o fornecedor ${fornecedor.descricao}?`,
      header: 'Não será possível reverter essa ação!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Excluir',
      rejectLabel:'Cancelar',
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.excluir(fornecedor.id);
      },
      reject: () => {}
    }); 
  }
  excluir(id){
    this.spinnerService.show();
    this.fornecedorService.delete(id).subscribe({
      next:(result)=>{
        this.spinnerService.hide();
        this.getFornecedores();

      },error:(err)=>{
        this.spinnerService.hide();

    }})
  }
}
