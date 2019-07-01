const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes')
require('./database')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(3000, function () {
  console.log('Server running on port 3000');
});