import React from 'react';

type CarregandoProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

function Carregando({ isLoading, children }: CarregandoProps) {
  return isLoading ? <span>Carregando...</span> : children;
}

export default Carregando;
