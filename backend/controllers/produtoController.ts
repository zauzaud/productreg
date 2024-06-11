import { Request, Response } from 'express';
import conexao from '../config/db';
import { Produto } from '../models/pedido';

export const obterProdutos = (req: Request, res: Response) => {
    const sql = 'SELECT * FROM produtos';
    conexao.query(sql, (err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(result);
    });
};

export const adicionarProduto = (req: Request, res: Response) => {
    const produto: Produto = req.body;
    const sql = 'INSERT INTO produtos (nome, preco, pedido_id) VALUES (?, ?, ?)';
    conexao.query(sql, [produto.nome, produto.preco, produto.pedidoId], (err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ id: result.insertId, ...produto });
    });
};

export const atualizarProduto = (req: Request, res: Response) => {
    const produto: Produto = req.body;
    const sql = 'UPDATE produtos SET nome = ?, preco = ? WHERE id = ?';
    conexao.query(sql, [produto.nome, produto.preco, req.params.id], (err: any, result: any) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(produto);
    });
};
