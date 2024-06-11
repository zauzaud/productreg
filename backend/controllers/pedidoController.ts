import { Request, Response } from 'express';
import conexao from '../config/db';
import { Pedido, Produto } from '../models/pedido';

export const obterPedidos = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM pedidos';
    conexao.query(sql, (err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const pedidos = result;
        const pedidosComProdutos = pedidos.map((pedido: Pedido) => {
            return new Promise<Pedido>((resolve, reject) => {
                const sqlProdutos = 'SELECT * FROM produtos WHERE pedido_id = ?';
                conexao.query(sqlProdutos, [pedido.id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    pedido.produtos = result;
                    resolve(pedido);
                });
            });
        });

        Promise.all(pedidosComProdutos)
            .then((pedidosCompletos) => res.json(pedidosCompletos))
            .catch((err) => res.status(500).send(err));
    });
};

export const adicionarPedido = (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    const sql = 'INSERT INTO pedidos (cliente, data) VALUES (?, ?)';
    conexao.query(sql, [pedido.cliente, pedido.data], (err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const pedidoId = result.insertId;
        const produtos = pedido.produtos?.map((produto: Produto) => [
            produto.nome, produto.preco, pedidoId
        ]);
        const sqlProdutos = 'INSERT INTO produtos (nome, preco, pedido_id) VALUES ?';
        conexao.query(sqlProdutos, [produtos], (err: any, result: any) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json({ id: pedidoId, ...pedido });
        });
    });
};
