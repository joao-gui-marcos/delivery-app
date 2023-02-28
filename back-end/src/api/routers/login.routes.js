const express = require('express');

const { login } = require('../controllers/userController');
const { validateLoginFields } = require('../middlewares/login.middlewares');

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, login);

module.exports = loginRouter;