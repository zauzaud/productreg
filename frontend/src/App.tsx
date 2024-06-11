import React from 'react';
import ControlePedido from './components/ControlePedido';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Controle de Pedidos</h1>
            <ControlePedido />
        </div>
    );
}

export default App;
