const express = require('express')
const mysql = require('mysql');
const app = express()
const path = require('path')
require('dotenv').config();

// Import Middleware
const logger = require('./middleware/logger')
app.use(logger)
const connection = require('./middleware/db_connect');
app.disable("x-powered-by");
// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/app1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app1.html'));
});

app.get('/app2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app2.html'));
});

app.get('/users', (req, res, next) => {
  const sql = "SELECT * FROM tb_data ORDER BY id desc"
  connection.query(sql,(error, fields) => {
    if (error) {
      console.log('error', error)
    } else {
      res.send(fields)
    }
  })
});

const port = process.env.PORT || process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app