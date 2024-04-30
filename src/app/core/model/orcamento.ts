export class OrcamentoModel {
    etapa:number;
    dados:OrcamentoDados
}
export class OrcamentoDados {
    codigo:number;
    descricao:string;
    unidade:string;
    quantidade:number;
    valorUnitario:ValorUnitario;
    total:number;

}
export class ValorUnitario {
    material:number;
    maoDeObra:number;
}

