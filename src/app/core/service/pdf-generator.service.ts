import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  htmltoPDF(divId: string, reportName: string) {
    html2canvas(document.querySelector(`#${divId}`), {scale: 1,allowTaint: true, useCORS: true}).then(canvas => {
      
      var ctx: any = canvas.getContext('2d');

      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(reportName);

    });
  }
}
