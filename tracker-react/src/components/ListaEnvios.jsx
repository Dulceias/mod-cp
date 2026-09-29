import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarEnvio from './EditarEnvio';

function ListaEnvios() {
  const [envios, setEnvios] = useState([]);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(null);

  const cargarEnvios = () => {
    api.get('/envios')
      .then(res => setEnvios(res.data))
      .catch(err => console.error('Error al obtener envíos:', err));
  };

  useEffect(() => {
    cargarEnvios();
  }, []);

  const eliminarEnvio = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este entrenamiento?')) {
      api.delete(`/envios/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarEnvios(); 
        })
        .catch(err => console.error('Error al eliminar envío:', err));
    }
  };

  return (
    <div>
      <h2>Historial de Entrenamientos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Competidor</th>
            <th>Problema</th>
            <th>Lenguaje</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {envios.map(v => (
            <tr key={v.id}>
              <td>{v.competidor}</td>
              <td>{v.problema}</td>
              <td>{v.lenguaje}</td>
              <td>{v.fecha}</td>
              <td>
                <button onClick={() => setEnvioSeleccionado(v)}>Editar</button>
                <button onClick={() => eliminarEnvio(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {envioSeleccionado && (
        <EditarEnvio 
          envio={envioSeleccionado} 
          onUpdate={() => {
            setEnvioSeleccionado(null);
            cargarEnvios();
          }} 
        />
      )}
    </div>
  );
}

export default ListaEnvios;