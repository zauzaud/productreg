import { Router } from 'express';
import { obterProdutos, adicionarProduto, atualizarProduto } from '../controllers/produtoController';

const router = Router();

router.get('/', obterProdutos);
router.post('/', adicionarProduto);
router.put('/:id', atualizarProduto);

export default router;
