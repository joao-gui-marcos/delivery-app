const express = require('express');

const { createUser, getAllSellers } = require('../controllers/userController');
const { validateLoginFields, validateName } = require('../middlewares/login.middlewares');

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, validateName, createUser);
userRouter.get('/', getAllSellers);
// Rota que retornar o seller

module.exports = userRouter;