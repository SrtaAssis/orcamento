import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteStorageService {
  private _cliente:Cliente = new Cliente()
  constructor() {
    this._cliente = {nome:'Julia Assis Felipe',obra:'Obra teste husky',telefone:31975995700,
    enderecoCliente:'Rua turin, firenze 79',endereco:'AV. Santana, parque ortolandia',cidade:'hortolandia',estado:'SP',
    email:'egurpo@gmail.com',tipoDeObra:'sla',previsaoInicio:new Date(),areaConstruida:250,areaProjetada:250,areaTerreno:300,
    encargosSociais:84,bdi:37,logoUrl:'/assets/fotos/logo.jpg'}
   }

  set cliente(cl:Cliente){
    this._cliente = cl;
  }
  get cliente(){
    return this._cliente;
  }
}
