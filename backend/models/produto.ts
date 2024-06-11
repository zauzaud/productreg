import conexao from '../config/db';

export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    pedidoId?: number;
}

// Criação da tabela de produtos, se não existir
const criarTabelaProdutos = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            pedido_id INT,
            FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
        )
    `;
    conexao.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao criar tabela produtos: ', err);
            return;
        }
        console.log('Tabela produtos criada com sucesso.');
    });
};

criarTabelaProdutos();

export default criarTabelaProdutos;
