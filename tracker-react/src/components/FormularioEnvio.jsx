import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioEnvio() {
  const [formData, setFormData] = useState({
    competidor_id: '',
    problema_id: '',
    lenguaje: 'C++', // Tu lenguaje principal
    fecha: ''
  });

  const [competidores, setCompetidores] = useState([]);
  const [problemas, setProblemas] = useState([]);

  // Cargar las listas al iniciar
  useEffect(() => {
    api.get('/competidores')
      .then(res => setCompetidores(res.data))
      .catch(err => console.error(err));

    api.get('/problemas')
      .then(res => setProblemas(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/envios', formData)
      .then(res => {
        alert(res.data.message);
        window.location.reload(); // Recarga la página para ver el nuevo registro en la tabla
      })
      .catch(err => console.error('Error al registrar envío:', err));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Registrar Nuevo Entrenamiento</h2>
      <form onSubmit={handleSubmit}>
        <select name="competidor_id" value={formData.competidor_id} onChange={handleChange} required>
          <option value="">Seleccione competidor</option>
          {competidores.map(c => (
            <option key={c.id} value={c.id}>{c.nombre} - {c.nivel}</option>
          ))}
        </select>

        <select name="problema_id" value={formData.problema_id} onChange={handleChange} required>
          <option value="">Seleccione problema</option>
          {problemas.map(p => (
            <option key={p.id} value={p.id}>{p.titulo} ({p.tema})</option>
          ))}
        </select>

        <input type="text" name="lenguaje" placeholder="Lenguaje" value={formData.lenguaje} onChange={handleChange} required />
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        
        <button type="submit">Guardar Envío</button>
      </form>
    </div>
  );
}

export default FormularioEnvio;