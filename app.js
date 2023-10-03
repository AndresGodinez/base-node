const express = require('express');
const app = express();
const authMiddleware = require('./Middlewares/Auth');

app.use(express.json());

const routes = require('./Routes/index');
app.use(routes);
app.use(authMiddleware);

module.exports = app;
