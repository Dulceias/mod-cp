require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Habilita la conexión con el frontend

// Conexión a la base de datos de Aiven
const conexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: false }, // Requerido por Aiven
  waitForConnections: true,
  connectionLimit: 10
});

// GET: Ver los envíos (Con INNER JOIN para ver nombres en vez de números)
app.get('/envios', (req, res) => {
  const sql = `
    SELECT v.id, e.nombre AS competidor, p.titulo AS problema,
    v.lenguaje, v.fecha
    FROM envios v
    INNER JOIN competidores e ON v.competidor_id = e.id
    INNER JOIN problemas p ON v.problema_id = p.id
  `;
  conexion.query(sql, (err, resultados) => {
    if (err) return res.status(500).send(err);
    res.json(resultados);
  });
});

// GET: Obtener competidores y problemas para el formulario
app.get('/competidores', (req, res) => {
  conexion.query('SELECT * FROM competidores', (err, r) => err ? res.status(500).send(err) : res.json(r));
});
app.get('/problemas', (req, res) => {
  conexion.query('SELECT * FROM problemas', (err, r) => err ? res.status(500).send(err) : res.json(r));
});

// POST: Registrar un nuevo envío de código
app.post('/envios', (req, res) => {
  const { competidor_id, problema_id, lenguaje, fecha } = req.body;
  conexion.query(
    'INSERT INTO envios (competidor_id, problema_id, lenguaje, fecha) VALUES (?, ?, ?, ?)',
    [competidor_id, problema_id, lenguaje, fecha],
    (err) => err ? res.status(500).send(err) : res.send({ message: 'Envío registrado correctamente' })
  );
});

// PUT y DELETE (Para editar o borrar si nos equivocamos) 7,
app.delete('/envios/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('DELETE FROM envios WHERE id=?', [id], (err) =>
    err ? res.status(500).send(err) : res.send({ message: `Envío eliminado` })
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});