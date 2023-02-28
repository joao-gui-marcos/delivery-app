const express = require('express');
const loginRouter = require('./routers/login.routes');

const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);

module.exports = app;
