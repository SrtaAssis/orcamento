import { TipoOrcamento } from '../enum/tipo-orcamento';

export class OrcamentoModel {
    etapa:number;
    dados:OrcamentoDados;
    tipo:TipoOrcamento;
    id:string;
    
    constructor(){
        this.dados = new OrcamentoDados();
        this.etapa = null;
        this.tipo = null;

    }
}

export class OrcamentoDados {
    id:string;
    descricao:string;
    unidade:string;
    quantidade:number;
    valorUnidade:ValorUnitario;
    contato?:ContatoFornecedor;
    fornecedor?:Fornecedor;
    pagamento?:PagamentoFornecedor;
    endereco?:enderecoFornecedor;

    constructor(){
        this.valorUnidade = new ValorUnitario();
        this.contato = new ContatoFornecedor();
        this.fornecedor = new Fornecedor();
        this.pagamento = new PagamentoFornecedor();
        this.endereco = new enderecoFornecedor();

    }
}
export class ValorUnitario {
    material:number = 0;
    maoDeObra:number = 0;
}
export class Fornecedor {
    empresa:string = '';
    cnpj:number = 0;	
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
