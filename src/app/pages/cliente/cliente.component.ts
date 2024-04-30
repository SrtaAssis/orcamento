import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../core/model/cliente';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClienteStorageService } from '../../core/storage/cliente-storage.service';
import { SelecionarImagemComponent } from '../../core/component/selecionar-imagem/selecionar-imagem.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ToastService } from '../../core/service/toast.service';
import { SpinnerService } from '../../core/service/spinner.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule,CalendarModule,CardModule,HttpClientModule,
    InputMaskModule,InputNumberModule,ReactiveFormsModule,ButtonModule,SelecionarImagemComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit{
  form:FormGroup;
  cliente:Cliente = new Cliente();
  constructor(private clienteStorage:ClienteStorageService,
    private toastService:ToastService,
    private spinnerService:SpinnerService
  ){}

  ngOnInit(): void {
    this.cliente = this.clienteStorage.cliente;
    this.buildForm();
  }

  buildForm(){
    this.form = new FormGroup({
      nome: new FormControl(this.cliente.nome,[Validators.required]),
      obra: new FormControl(this.cliente.obra,[Validators.required]),
      telefone: new FormControl(this.cliente.telefone,[Validators.required]),
      enderecoCliente: new FormControl(this.cliente.enderecoCliente,[Validators.required]),
      endereco: new FormControl(this.cliente.endereco,[Validators.required]),
      cidade: new FormControl(this.cliente.cidade,[Validators.required]),
      estado: new FormControl(this.cliente.estado,[Validators.required]),
      email: new FormControl(this.cliente.email,[Validators.required]),
      tipoDeObra: new FormControl(this.cliente.tipoDeObra,[Validators.required]),
      previsaoInicio: new FormControl(this.cliente.previsaoInicio,[Validators.required]),
      areaProjetada: new FormControl(this.cliente.areaProjetada,[Validators.required]),
      areaConstruida: new FormControl(this.cliente.areaConstruida,[Validators.required]),
      areaTerreno: new FormControl(this.cliente.areaTerreno,[Validators.required]),
      logoUrl: new FormControl(this.cliente.logoUrl,[Validators.required]),
      encargosSociais: new FormControl(this.cliente.encargosSociais,[Validators.required]),
      bdi: new FormControl(this.cliente.bdi,[Validators.required]),

    })
  }

  setLogo(foto: string) {    
    if(foto){
      this.form.get('logoUrl').setValue(foto);
    }
  }

  salvar(){
    if(this.form.invalid){
      this.toastService.showWarn('Info',"Preencha todos os campos necessários");
      return
    }
    this.clienteStorage.cliente = this.form.value;
    this.toastService.showSuccess('Salvo',"Salvo com sucesso!");

  }
}
