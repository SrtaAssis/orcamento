import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import * as XLSX from 'xlsx';
import { FileUploadModule } from 'primeng/fileupload';
import { SafeUrl } from '@angular/platform-browser';
import { OrcamentoDados } from '../../core/model/orcamento';
import { SinapService } from '../../core/service/sinap.service';
import { SpinnerService } from '../../core/service/spinner.service';
import { ToastService } from '../../core/service/toast.service';
import { Table, TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-bases',
  standalone: true,
  imports: [CommonModule,ButtonModule,FileUploadModule,TableModule,ReactiveFormsModule,FormsModule,InputTextModule],
  templateUrl: './bases.component.html',
  styleUrl: './bases.component.scss'
})
export class BasesComponent implements OnInit{
  
  jsonData: any = [];
  @ViewChild('fileUploadSimple') fileInput!: Element;
  arquivo!: { base64: string; safeUrl: SafeUrl; };
  importedData!: { nome: string; email: string; }[];
  columnNames: string[] = [];
  sinap:OrcamentoDados[]=[];
  searchValue: string | undefined;

  constructor(
    private sinapService:SinapService,
    public spinnerService:SpinnerService,
    private toastService:ToastService

  ){}

  ngOnInit(): void {
    this.getSinap();
  }

  uploadArquivo(event: any){            
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    
    reader.onload = (event) => {
      const data = reader.result;      
      workBook = XLSX.read(data, { type: 'binary' });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      jsonData = XLSX.utils.sheet_to_json(workSheet, { header: 1 }); // Mantém os nomes das colunas
      jsonData.splice(0,1);
      this.columnNames = this.extractColumnNames(workSheet);
      this.jsonData = this.transformData(jsonData,this.columnNames);
      this.configSalvarSinap(this.jsonData);
    };
    reader.readAsBinaryString(file);   
     
  }
  
  extractColumnNames(workSheet: XLSX.WorkSheet): string[] {
    
    const header:any = XLSX.utils.sheet_to_json(workSheet, { header: 1 })[0];
    const hederLow = header.map((col) => col.toString().replace(/\s+/g, '').toLowerCase());

    const columnMap = {
        'códigodacomposição(sinapi)': 'id',
        'descriçãodacomposição': 'descricao',
        'unidade': 'unidade',
        'customaterial': 'material',
        'customãodeobra': 'maoDeObra',
        'custototal': 'id'
    };

    const updatedHeader = hederLow.map(col => columnMap[col] || col);

    return updatedHeader;
  }

  transformData(data: any[], columnNames: string[]): any[] {
    return data.reduce((acc, row) => {
      if (row.length <= 9) {
          const rowData = row.reduce((obj, value, index) => {
              const columnName = columnNames[index];
              if (columnName === 'maoDeObra' || columnName === 'material') {
                  if (!obj['valorUnidade']) {
                      obj['valorUnidade'] = {};
                  }
                  obj['valorUnidade'][columnName] = value;
              } else {
                  obj[columnName] = value;
              }
              return obj;
          }, {});
          acc.push(rowData);
      }
      return acc;
  }, []);
  }
  async configSalvarSinap(dados) {
    try {
      if (this.sinap.length > 0) {
        await this.deletarDadosSinap(dados);
        
        // Setting a delay using a Promise
        await new Promise((resolve) => setTimeout(resolve, 6000));
  
        await this.salvarDadosSinap(dados);
      } else {
        await this.salvarDadosSinap(dados);
      }
    } catch (error) {
      console.error('Error in configSalvarSinap:', error);
      // Handle the error (e.g., retry, notify the user, etc.)
    }
  }

  deletarDadosSinap(dados){
    this.toastService.showWarn("Espere um momento!","Estamos limpando os antigos dados sinap.");
    this.spinnerService.show();

    this.sinapService.deletar().subscribe({
      next: (result) => {
        this.sinap = [];
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }

  salvarDadosSinap(dados){
    this.toastService.showInfo("Salvando...","Salvando novos dados sinap.");
    this.spinnerService.show();

    this.sinapService.salvar(dados).subscribe({
      next: (result) => {
        this.getSinap();
        this.spinnerService.hide();
        this.toastService.showSuccess("SINAP","Dados Salvos com sucesso!")
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
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
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

}
