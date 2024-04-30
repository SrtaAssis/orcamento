import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from './core/component/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,OverlayPanelModule,ButtonModule,PanelMenuModule,CommonModule,SpinnerComponent, ToastModule],
    templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'orcamento-app';
  items = [
    {
      label: 'Cliente',
      icon: 'pi pi-fw pi-user',
      iconColor: '#FFC906',
      styleClass: 'comunidades-bg',
      routerLink: '/cliente',
      active: false,
    },
    {
      label: 'Orçamento',
      icon: 'pi pi-fw pi-clipboard',
      iconColor: '#ff6900',
      styleClass: 'desafios-bg',
      routerLink: '/orcamento',
      active: false,
    },
    {
      label: 'Etapas',
      icon: 'pi pi-fw pi-inbox',
      iconColor: '#ec67f9',
      styleClass: 'lojas-bg',
      routerLink: '/etapas',
      active: false,
    },
    {
      label: 'Fornecedores',
      icon: 'pi pi-fw pi-clipboard',
      iconColor: '#1cccbe',
      styleClass: 'influencers-bg',
      routerLink: '/fornecedores',
      active: false,
    },
    {
      label: 'Bases',
      icon: 'pi pi-fw pi-clipboard',
      iconColor: '#876ffe',
      styleClass: 'relatorios-bg',
      routerLink: '/bases',
      active: false,
    },
  ];

  
  constructor(private config: PrimeNGConfig,private route:Router) {

  }
  navegarHome(){
    this.route.navigate(['/home'])
  }
  ngOnInit() {
    this.config.setTranslation({
      accept: 'Ok',
      reject: 'Cancelar',
      dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Se', 'Sá'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      selectionMessage: '{0} itens selecionados',
      emptySelectionMessage: 'Nenhum item selecionado'
    });
  }
}
