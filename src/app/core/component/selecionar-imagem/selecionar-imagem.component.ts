import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-selecionar-imagem',
  standalone: true,
  imports: [CommonModule,FileUploadModule,ButtonModule],
  templateUrl: './selecionar-imagem.component.html',
  styleUrl: './selecionar-imagem.component.scss'
})
export class SelecionarImagemComponent implements OnInit{

  @Input()
  texto: string = '';
  
  @Input()
  detalhe: string = '';

  @Input()
  classCss: string = '';

  @Input() fotoUrl:any;

  @Output()
  fotosSelecionadas: EventEmitter<any> = new EventEmitter<any>();


  uploadedFiles: any[] = [];

  foto:{base64: any, safeUrl: SafeUrl};


  constructor(
    private sanitizer: DomSanitizer, 

  ){

  }
  ngOnInit(): void {
    if(this.fotoUrl){
      const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.fotoUrl);
      this.foto = {base64:'',safeUrl:safeUrl};
    }
  }

  onUpload(event:any) {
    
    let fileReader = new FileReader();

    for (let file of event.files) {
      fileReader.readAsDataURL(file);

    }
    setTimeout(() => {
      this.foto = {base64:fileReader.result,safeUrl:event.currentFiles[0].objectURL};
        this.fotosSelecionadas.emit(fileReader.result);


    }, 500);
    

}
deletePicture(): void {
  this.foto = null;
  this.fotosSelecionadas.emit(null);

}

}
