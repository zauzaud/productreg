import { Router } from 'express';
import { obterPedidos, adicionarPedido } from '../controllers/pedidoController';

const router = Router();

router.get('/', obterPedidos);
router.post('/', adicionarPedido);

export default router;
