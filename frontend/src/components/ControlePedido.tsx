import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pedido, Produto } from '../models/Pedido';
import BarraProgresso from './BarraProgresso';
import '../styles/ControlePedido.css';  // 

const ControlePedido: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [itens, setItens] = useState<Produto[]>([]);
    const [cliente, setCliente] = useState('');
    const [data, setData] = useState('');
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [nomeProduto, setNomeProduto] = useState('');
    const [precoProduto, setPrecoProduto] = useState(0);
    const [progresso, setProgresso] = useState(0);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);

    useEffect(() => {
        // Fetch inicial dos pedidos
        axios.get('http://localhost:2000/api/pedidos')
            .then(response => {
                console.log('Pedidos obtidos do backend:', response.data);
                setPedidos(response.data);
            })
            .catch(error => console.error('Erro ao obter pedidos:', error));
        
        // Fetch inicial dos itens
        axios.get('http://localhost:2000/api/produtos')
            .then(response => {
                console.log('Itens obtidos do backend:', response.data);
                setItens(response.data);
            })
            .catch(error => console.error('Erro ao obter itens:', error));
    }, []);

    const adicionarProduto = () => {
        if (produtoEmEdicao) {
            const produtosAtualizados = produtos.map(produto =>
                produto === produtoEmEdicao ? { ...produto, nome: nomeProduto, preco: precoProduto } : produto
            );
            setProdutos(produtosAtualizados);
            setProdutoEmEdicao(null);
        } else {
            const novoProduto: Produto = { nome: nomeProduto, preco: precoProduto };
            setProdutos([...produtos, novoProduto]);
        }
        setNomeProduto('');
        setPrecoProduto(0);
        calcularProgresso();
        console.log('Produtos adicionados:', produtos);
    };

    const editarProduto = (produto: Produto) => {
        setProdutoEmEdicao(produto);
        setNomeProduto(produto.nome);
        setPrecoProduto(produto.preco);
    };

    const salvarProduto = (produto: Produto) => {
        axios.put(`http://localhost:2000/api/produtos/${produto.id}`, produto)
            .then(response => {
                console.log('Produto atualizado:', response.data);
                const itensAtualizados = itens.map(item => item.id === produto.id ? produto : item);
                setItens(itensAtualizados);
            })
            .catch(error => console.error('Erro ao atualizar produto:', error));
    };

    const adicionarPedido = () => {
        if (cliente && data && produtos.length > 0) {
            const novoPedido: Pedido = { cliente, data, produtos };
            console.log('Enviando novo pedido para o backend:', novoPedido);
            axios.post('http://localhost:2000/api/pedidos', novoPedido)
                .then(response => {
                    console.log('Pedido adicionado:', response.data);
                    setPedidos([...pedidos, response.data]);
                    // Resetar os campos do pedido
                    setCliente('');
                    setData('');
                    setProdutos([]);
                    setProgresso(0);
                })
                .catch(error => console.error('Erro ao adicionar pedido:', error));
        } else {
            alert('Por favor, preencha todos os campos e adicione pelo menos um produto.');
        }
    };

    const calcularProgresso = () => {
        let camposPreenchidos = 0;
        if (cliente) camposPreenchidos++;
        if (data) camposPreenchidos++;
        if (produtos.length > 0) camposPreenchidos++;
        setProgresso((camposPreenchidos / 3) * 100);
    };

    return (
        <div className="container">
            <h2>Pedidos</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                />
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <h3>Produtos</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Preço do Produto"
                    value={precoProduto}
                    onChange={(e) => setPrecoProduto(parseFloat(e.target.value))}
                />
                <button onClick={adicionarProduto}>
                    {produtoEmEdicao ? 'Atualizar Produto' : 'Adicionar Produto'}
                </button>
            </div>
            <ul>
                {produtos.map((produto, index) => (
                    <li key={index}>
                        {produto.nome} - {produto.preco}
                        <button onClick={() => editarProduto(produto)}>Editar</button>
                    </li>
                ))}
            </ul>
            <button onClick={adicionarPedido}>Adicionar Pedido</button>
            <BarraProgresso progresso={progresso} />
            <h3>Lista de Pedidos</h3>
            <div className="pedido-lista">
                {pedidos.map((pedido) => (
                    <div key={pedido.id} className="pedido-item">
                        <h4>{pedido.cliente}</h4>
                        <p>{pedido.data}</p>
                        <ul>
                            {pedido.produtos.map((produto) => (
                                <li key={produto.id}>{produto.nome} - {produto.preco}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <h3>Lista de Itens</h3>
            <div className="item-lista">
                {itens.map((item) => (
                    <div key={item.id} className="item">
                        <input
                            type="text"
                            value={item.nome}
                            onChange={(e) => setNomeProduto(e.target.value)}
                        />
                        <input
                            type="number"
                            value={item.preco}
                            onChange={(e) => setPrecoProduto(parseFloat(e.target.value))}
                        />
                        <button onClick={() => salvarProduto({ ...item, nome: nomeProduto, preco: precoProduto })}>
                            Salvar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ControlePedido;
