const express = require('express');

const { createUser,
  getAllSellers,
  getAllUsers, createUserByManagement, deleteUser } = require('../controllers/userController');
const { validateLoginFields, validateName } = require('../middlewares/login.middlewares');

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, validateName, createUser);
userRouter.get('/', getAllSellers);
userRouter.get('/all', getAllUsers);
userRouter.post('/manager/newuser', createUserByManagement);
userRouter.delete('/', deleteUser);
// Rota que retornar o seller

module.exports = userRouter;