import { TipoOrcamento } from '../enum/etapa copy';

export class OrcamentoModel {
    etapa:number;
    dados:OrcamentoDados;
    tipo:TipoOrcamento;

    constructor(){
        this.dados = new OrcamentoDados();
    }
}

export class OrcamentoDados {
    codigo:number;
    descricao:string;
    unidade:string;
    quantidade:number;
    valorUnitario:ValorUnitario;
    contato?:ContatoFornecedor;
    fornecedor?:Fornecedor;
    pagamento?:PagamentoFornecedor;
    endereco?:enderecoFornecedor;

    constructor(){
        this.valorUnitario = new ValorUnitario();
        this.contato = new ContatoFornecedor();
        this.fornecedor = new Fornecedor();
        this.pagamento = new PagamentoFornecedor();
        this.endereco = new enderecoFornecedor();

    }
}
export class ValorUnitario {
    material:number;
    maoDeObra:number;
}
export class Fornecedor {
    empresa:string;
    cnpj:number;	
}
export class enderecoFornecedor {
    cidade:string;
    estado:string
    endereco:string;
    cep:number;
}
export class ContatoFornecedor {
    telefone:number;
    email:string;
}
export class PagamentoFornecedor {

    prazoEntrega:number;
    compraMinima:number;
    garantiaOferecida:number;
}
