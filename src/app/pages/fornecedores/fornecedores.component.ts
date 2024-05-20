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
    public dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.configTabela();
  }

  configTabela(){
    this.fornecedores = this.fornecedoresStorage.fornecedores;
  }

  abrirCadastroFornecedores(){
    this.ref = this.dialogService.open(NovoFornecedorComponent, { 
      header: 'Cadastrar Novo Fornecedor',
    });
    this.ref.onClose.subscribe((refresh: boolean) => {
      if (refresh) {
          this.configTabela();
      }
    });
  }
}
