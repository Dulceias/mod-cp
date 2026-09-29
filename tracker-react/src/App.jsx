import React from 'react';
import ListaEnvios from './components/ListaEnvios';
import FormularioEnvio from './components/FormularioEnvio';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Tracker de Problemas</h1>
      <FormularioEnvio />
      <hr />
      <ListaEnvios />
    </div>
  );
}

export default App;