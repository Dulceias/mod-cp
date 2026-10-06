import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarEnvio({ envio, onUpdate }) {
  const [formData, setFormData] = useState({
    competidor_id: envio.competidor_id || '',
    problema_id: envio.problema_id || '',
    lenguaje: envio.lenguaje,
    fecha: envio.fecha
  });
  
  const [competidores, setCompetidores] = useState([]);
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    api.get('/competidores').then(res => setCompetidores(res.data)).catch(err => console.error(err));
    api.get('/problemas').then(res => setProblemas(res.data)).catch(err => console.error(err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/envios/${envio.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate(); 
      })
      .catch(err => console.error('Error al actualizar envío:', err));
  };

  return (
    <div className="edit-panel">
      <h3>✏️ Editar Entrenamiento</h3>
      <form onSubmit={handleSubmit}>
        <select name="competidor_id" value={formData.competidor_id} onChange={handleChange} required>
          {competidores.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select name="problema_id" value={formData.problema_id} onChange={handleChange} required>
          {problemas.map(p => <option key={p.id} value={p.id}>{p.titulo}</option>)}
        </select>
        <input type="text" name="lenguaje" value={formData.lenguaje} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <button type="submit">Actualizar Envío</button>
      </form>
    </div>
  );
}

export default EditarEnvio;