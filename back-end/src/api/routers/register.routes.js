const express = require('express');

const { createUser } = require('../controllers/userController');
const { validateLoginFields, validateName } = require('../middlewares/login.middlewares');

const registerRouter = express.Router();

registerRouter.post('/', validateLoginFields, validateName, createUser);

module.exports = registerRouter;