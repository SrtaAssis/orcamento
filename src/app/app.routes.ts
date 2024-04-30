import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { EtapasComponent } from './pages/etapas/etapas.component';
import { BdiComponent } from './pages/bdi/bdi.component';
import { BasesComponent } from './pages/bases/bases.component';
import { HomeComponent } from './pages/home/home.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'cliente',
        component: ClienteComponent
    },
    {
        path:'orcamento',
        component: OrcamentoComponent
    },
    {
        path:'etapas',
        component: EtapasComponent
    },
    {
        path:'fornecedores',
        component: FornecedoresComponent
    },
    {
        path:'bases',
        component: BasesComponent
    },
];
