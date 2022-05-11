const express = require("express");
const router = express.Router();

const mysqlConnection = require("./dbConfig");
// GET all 
router.get('/', (req, res) => {
  mysqlConnection.query("SELECT * FROM operaciones;", (err, rows, fields) => {
                    
  if (!err) {
    res.json(rows);
  } else {
    console.log(err);
  }
  });
});

// GET one
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM operaciones WHERE Id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// INSERT An operation
router.post('/', (req, res) => {
  const { Concepto, Monto, Fecha, Tipo } = req.body;
  mysqlConnection.query("INSERT INTO operaciones (Concepto, Monto, Fecha, Tipo) VALUES (?, ?, ?, ?);", [Concepto, Monto, Fecha, Tipo], (err, results, fields) => {
    if (!err) {
      res.json({ Status: "Operacion Saved" });
    } else {
      console.log(err);
    }
  });
});

// DELETE An operation
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM operaciones WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Employee Deleted' });
    } else {
      console.log(err);
    }
  });
});

// UPDATE An operation
router.put('/:id', (req, res) => {
  const { Concepto, Monto, Fecha } = req.body;
  const { id } = req.params;
  mysqlConnection.query("UPDATE operaciones SET Concepto = ?, Fecha = ?, Monto = ? WHERE operaciones.Id = ?;"
    , [Concepto, Fecha, Monto, id], (err, results, fields) => {
      if (!err) {
        res.json({ Status: "Operacion Saved" });
      } else {
        console.log(err);
      }
    });
});
module.exports = router;