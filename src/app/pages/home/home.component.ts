import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import * as XLSX from 'xlsx';
import { FileUploadModule } from 'primeng/fileupload';
import { SafeUrl } from '@angular/platform-browser';
import { PrecoRefStorageService } from '../../core/storage/preco-ref-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ButtonModule,FileUploadModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  jsonData: any = [];
  @ViewChild('fileUploadSimple') fileInput!: ElementRef;
  arquivo!: { base64: string; safeUrl: SafeUrl; };
  importedData!: { nome: string; email: string; }[];
  columnNames: string[] = [];


  constructor(private precoRefStorageService:PrecoRefStorageService){}


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
      jsonData.splice(0,7);
      this.columnNames = this.extractColumnNames(workSheet);
      this.jsonData = this.transformData(jsonData,this.columnNames);
      this.precoRefStorageService.precoRefInsumos = this.jsonData;
      console.log( this.precoRefStorageService.precoRefInsumos);
    };
    reader.readAsBinaryString(file);   
     
  }
  
  extractColumnNames(workSheet: XLSX.WorkSheet): string[] {
    const header:any = XLSX.utils.sheet_to_json(workSheet, { header: 1 })[6];

    return  header.map((col: any) => col.toString().replace(/\s+/g, '').toLowerCase());;
  }

  transformData(data: any[], columnNames: string[]): any[] {
    const transformedData: any[] = [];
    data.forEach(row => {
      let rowData: any = {};
      row.forEach((value:any, index:number) => {
        rowData[columnNames[index]] = value;
      });
      transformedData.push(rowData);
    });
    return transformedData;
  }
}
