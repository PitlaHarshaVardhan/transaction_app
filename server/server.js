const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

const currentDate = new Date().toISOString().split('T')[0];
// const formattedDate = currentDate.getFullYear() + '-' + String(currentDate.getMonth() + 1).padStart(2, '0') + '-'+ String(currentDate.getDate()).padStart(2, '0');

// Enable CORS
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '94409912@Harsha',
  database: 'mydb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// API route to get all transactions
app.get('/transaction', (req, res) => {
  db.query('SELECT * FROM transaction', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    } else {
      res.json(results);
    }
  });
});

// API route to create a transaction



app.post('/transaction', (req, res) => {
  const {transactionid, title, amount, type } = req.body;
  console.log(req.body)
  db.query('INSERT INTO transaction (transactionid,title, amount, type,date) VALUES (?, ?, ?, ?,?)', [transactionid,title, amount, type, currentDate], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      console.log(err.message)
    } else {
      res.status(201).json({transactionid,title, amount, type });
    }
  });
});

// API route to delete a transaction
app.delete('/transaction/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id)
  db.query('DELETE FROM transaction WHERE transactionid = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: `Transaction with ID ${id} deleted` });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
