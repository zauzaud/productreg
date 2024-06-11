import React from 'react';

interface BarraProgressoProps {
    progresso: number;
}

const BarraProgresso: React.FC<BarraProgressoProps> = ({ progresso }) => {
    return (
        <div className="barra-progresso">
            <div
                className="barra-progresso__preenchimento"
                style={{ width: `${progresso}%` }}
            ></div>
        </div>
    );
}

export default BarraProgresso;
