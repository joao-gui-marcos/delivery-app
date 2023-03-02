const express = require('express');

const { createUser, findSeller } = require('../controllers/userController');
const { validateLoginFields, validateName } = require('../middlewares/login.middlewares');

const registerRouter = express.Router();

registerRouter.post('/', validateLoginFields, validateName, createUser);
registerRouter.get('/', findSeller);
// Rota que retornar o seller

module.exports = registerRouter;