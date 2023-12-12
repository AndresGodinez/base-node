const express = require('express');
const app = express();
const authMiddleware = require('./Middlewares/AuthMiddleware');

app.use(authMiddleware);
app.use(express.json());

const routes = require('./Routes/index');
app.use(routes);

module.exports = app;
