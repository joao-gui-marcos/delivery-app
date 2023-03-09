const express = require('express');

const { createUser, getAllSellers, createUserByManagement, deleteUser } = require('../controllers/userController');
const { validateLoginFields, validateName } = require('../middlewares/login.middlewares');

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, validateName, createUser);
userRouter.get('/', getAllSellers);
userRouter.post('/manager/newuser', createUserByManagement);
userRouter.delete('/:id', deleteUser);
// Rota que retornar o seller

module.exports = userRouter;