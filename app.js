const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./Routes/index');
app.use(routes);

module.exports = app;
