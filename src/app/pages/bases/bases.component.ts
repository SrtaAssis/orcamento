import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import * as XLSX from 'xlsx';
import { FileUploadModule } from 'primeng/fileupload';
import { SafeUrl } from '@angular/platform-browser';
import { OrcamentoDados } from '../../core/model/orcamento';
import { SinapService } from '../../core/service/sinap.service';
import { SpinnerService } from '../../core/service/spinner.service';
import { ToastService } from '../../core/service/toast.service';

@Component({
  selector: 'app-bases',
  standalone: true,
  imports: [CommonModule,ButtonModule,FileUploadModule],
  templateUrl: './bases.component.html',
  styleUrl: './bases.component.scss'
})
export class BasesComponent {
  jsonData: any = [];
  @ViewChild('fileUploadSimple') fileInput!: Element;
  arquivo!: { base64: string; safeUrl: SafeUrl; };
  importedData!: { nome: string; email: string; }[];
  columnNames: string[] = [];


  constructor(
    private sinapService:SinapService,
    private spinnerService:SpinnerService,
    private toastService:ToastService

  ){}


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
      // this.precoRefStorageService.precoRefInsumos = this.jsonData;
      console.log(this.jsonData);
      this.salvarDadosSinap(this.jsonData);
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
  
  salvarDadosSinap(dados){
    this.spinnerService.show();
    this.sinapService.salvar(dados).subscribe({
      next: (result) => {
        this.spinnerService.hide();

      }, error: (err) => {
        this.spinnerService.hide();
      }
    });
  }
}
