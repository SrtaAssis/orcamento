import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PdfGeneratorService } from '../../service/pdf-generator.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-botoes-exportacao',
  standalone: true,
  imports:[CommonModule,ButtonModule],
  templateUrl: './botoes-exportacao.component.html',
  styleUrls: ['./botoes-exportacao.component.scss']
})
export class BotoesExportacaoComponent implements OnInit {

  @Input()
  parentId: string;
  
  @Input()
  nomeRelatorio: string;

  @Output()
  fimProcessamento: EventEmitter<any> = new EventEmitter();
  
  @Output()
  inicioProcessamento: EventEmitter<any> = new EventEmitter();

  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  exportar(tipo: string): void {
    if(tipo == 'pdf'){
      this.inicioProcessamento.emit('pdf');
      this.toastService.showInfo('Atenção!','Por favor, aguarde! Gerando PDF...');
      setTimeout(() => {
        this.pdfGeneratorService.htmltoPDF(this.parentId, this.nomeRelatorio);  
        this.fimProcessamento.emit('pdf');
      }, 2500);
    }
  }
}
