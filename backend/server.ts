import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pedidoRoutes from './routes/pedidoRoutes';
import produtoRoutes from './routes/produtoRoutes';

const app = express();

app.use(cors());  
app.use(bodyParser.json());

// Rotas
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/produtos', produtoRoutes);

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
