export interface Pedido {
    id?: number;
    cliente: string;
    data: string;
    produtos: Produto[];
}

export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    pedidoId?: number;
}
