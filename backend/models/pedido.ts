import conexao from '../config/db';

export interface Pedido {
    id?: number;
    cliente: string;
    data: string;
    produtos?: Produto[];
}

export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    pedidoId?: number;
}

// Criação da tabela de pedidos, se não existir
const criarTabelaPedidos = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS pedidos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cliente VARCHAR(255) NOT NULL,
            data DATE NOT NULL
        )
    `;
    conexao.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao criar tabela pedidos: ', err);
            return;
        }
        console.log('Tabela pedidos criada com sucesso.');
    });
};

criarTabelaPedidos();

export default criarTabelaPedidos;
